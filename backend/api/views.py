from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import generics, viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import TodoList, TodoItem, Tag, TodoItemTag
from .serializers import (
    UserSerializer, 
    TodoListSerializer, 
    TodoItemSerializer, 
    TagSerializer
)
from .permissions import IsOwnerOrReadOnly


class CreateUserView(generics.CreateAPIView):
  """
  View to create a new user
  """
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]


class TodoListViewSet(viewsets.ModelViewSet):
  """
  ViewSet for viewing and editing todo lists
  """
  serializer_class = TodoListSerializer
  permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
  filter_backends = [filters.SearchFilter, filters.OrderingFilter]
  search_fields = ['title', 'description']
  ordering_fields = ['created_at', 'updated_at', 'title']
  
  def get_queryset(self):
    """Return todo lists only for the current user"""
    return TodoList.objects.filter(owner=self.request.user)
  
  def perform_create(self, serializer):
    """Save the owner as the current user when creating a todo list"""
    serializer.save(owner=self.request.user)
  
  @action(detail=True, methods=['get'])
  def items(self, request, pk=None):
    """List all items for a specific todo list"""
    todolist = self.get_object()
    items = TodoItem.objects.filter(todolist=todolist)
    serializer = TodoItemSerializer(items, many=True)
    return Response(serializer.data)


class TodoItemViewSet(viewsets.ModelViewSet):
  """
  ViewSet for viewing and editing todo items
  """
  serializer_class = TodoItemSerializer
  permission_classes = [IsAuthenticated]
  filter_backends = [filters.SearchFilter, filters.OrderingFilter]
  search_fields = ['title', 'description']
  ordering_fields = ['due_date', 'priority', 'created_at', 'is_completed']
  
  def get_queryset(self):
    """Return todo items for the current user's lists"""
    return TodoItem.objects.filter(todolist__owner=self.request.user)
  
  def perform_create(self, serializer):
    """Validate todolist ownership before creating item"""
    todolist_id = self.request.data.get('todolist')
    todolist = get_object_or_404(TodoList, id=todolist_id)
    
    if todolist.owner != self.request.user:
      raise PermissionError("You don't have permission to add items to this list")
        
    serializer.save()
  
  @action(detail=True, methods=['post'])
  def complete(self, request, pk=None):
    """Mark a todo item as complete"""
    todo_item = self.get_object()
    todo_item.complete()
    return Response({'status': 'item completed'})
  
  @action(detail=True, methods=['post'])
  def reopen(self, request, pk=None):
    """Mark a todo item as incomplete"""
    todo_item = self.get_object()
    todo_item.reopen()
    return Response({'status': 'item reopened'})


class TagViewSet(viewsets.ModelViewSet):
  """
  ViewSet for viewing and editing tags
  """
  queryset = Tag.objects.all()
  serializer_class = TagSerializer
  permission_classes = [IsAuthenticated]
  filter_backends = [filters.SearchFilter]
  search_fields = ['name']


class TodoItemsByTagView(generics.ListAPIView):
  """
  View to list all todo items with a specific tag
  """
  serializer_class = TodoItemSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
      tag_name = self.kwargs['tag_name']
      tag = get_object_or_404(Tag, name=tag_name)
      return TodoItem.objects.filter(
        tags__tag=tag,
        todolist__owner=self.request.user
      )
  