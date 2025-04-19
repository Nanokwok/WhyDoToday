from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TodoList, TodoItem


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = [
            'id', 'title', 'description', 'due_date', 
            'priority', 'is_completed', 'created_at', 
            'updated_at', 'completed_at', 'todolist'
        ]
        read_only_fields = ['created_at', 'updated_at', 'completed_at']


class TodoListSerializer(serializers.ModelSerializer):
    items_count = serializers.SerializerMethodField()
    
    class Meta:
        model = TodoList
        fields = ['id', 'title', 'description', 'created_at', 'updated_at', 'owner', 'items_count']
        read_only_fields = ['created_at', 'updated_at', 'owner', 'items_count']
    
    def get_items_count(self, obj):
        return obj.items.count()