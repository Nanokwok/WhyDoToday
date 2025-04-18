from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TodoList, TodoItem, Tag, TodoItemTag


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'password']
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    print(validated_data)
    user = User.objects.create_user(**validated_data)
    return user


class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tag
    fields = ['id', 'name']


class TodoItemSerializer(serializers.ModelSerializer):
  tags = serializers.PrimaryKeyRelatedField(
    many=True,
    queryset=Tag.objects.all(),
    required=False
  )
  
  class Meta:
    model = TodoItem
    fields = [
      'id', 'title', 'description', 'due_date', 
      'priority', 'is_completed', 'created_at', 
      'updated_at', 'completed_at', 'todolist', 'tags'
    ]
    read_only_fields = ['created_at', 'updated_at', 'completed_at']
  
  def create(self, validated_data):
    tags_data = validated_data.pop('tags', [])
    todo_item = TodoItem.objects.create(**validated_data)
    
    for tag in tags_data:
        TodoItemTag.objects.create(todo_item=todo_item, tag=tag)
        
    return todo_item

  def update(self, instance, validated_data):
    tags_data = validated_data.pop('tags', None)

    for attr, value in validated_data.items():
      setattr(instance, attr, value)
    instance.save()
    
    if tags_data is not None:
      TodoItemTag.objects.filter(todo_item=instance).delete()
      
      for tag in tags_data:
        TodoItemTag.objects.create(todo_item=instance, tag=tag)
            
    return instance


class TodoListSerializer(serializers.ModelSerializer):
    items_count = serializers.SerializerMethodField()
    
    class Meta:
        model = TodoList
        fields = ['id', 'title', 'description', 'created_at', 'updated_at', 'owner', 'items_count']
        read_only_fields = ['created_at', 'updated_at', 'owner', 'items_count']
    
    def get_items_count(self, obj):
        return obj.items.count()
    