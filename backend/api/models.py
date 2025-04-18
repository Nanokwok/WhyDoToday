from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class TodoList(models.Model):
  """Model representing a todo list"""
  title = models.CharField(max_length=100)
  description = models.TextField(blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todolists')
  
  def __str__(self):
      return self.title
  
  class Meta:
      ordering = ['-created_at']


class TodoItem(models.Model):
  """Model representing individual items in a todo list"""
  TODO_PRIORITY = (
    ('1', 'Low'),
    ('2', 'Medium'),
    ('3', 'High'),
  )
  
  title = models.CharField(max_length=100)
  description = models.TextField(blank=True)
  due_date = models.DateTimeField(null=True, blank=True)
  priority = models.CharField(max_length=1, choices=TODO_PRIORITY, default='2')
  is_completed = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  completed_at = models.DateTimeField(null=True, blank=True)
  todolist = models.ForeignKey(TodoList, on_delete=models.CASCADE, related_name='items')
  
  def __str__(self):
    return self.title
  
  def complete(self):
    """Mark the item as complete and set the completion time"""
    self.is_completed = True
    self.completed_at = timezone.now()
    self.save()
  
  def reopen(self):
    """Mark the item as incomplete"""
    self.is_completed = False
    self.completed_at = None
    self.save()
  
  class Meta:
    ordering = ['is_completed', '-priority', 'due_date']


class Tag(models.Model):
  """Model for tagging todo items"""
  name = models.CharField(max_length=30, unique=True)
  
  def __str__(self):
    return self.name


class TodoItemTag(models.Model):
  """Many-to-many relationship between TodoItems and Tags"""
  todo_item = models.ForeignKey(TodoItem, on_delete=models.CASCADE, related_name='tags')
  tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name='todo_items')
  
  class Meta:
    unique_together = ('todo_item', 'tag')
