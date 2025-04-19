from django.contrib import admin
from .models import TodoList, TodoItem

class TodoItemInline(admin.TabularInline):
    model = TodoItem
    fields = ('title', 'priority', 'is_completed', 'due_date', 'created_at')
    readonly_fields = ('created_at',)
    extra = 1
    show_change_link = True
    autocomplete_fields = ('todolist',)

@admin.register(TodoList)
class TodoListAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'created_at', 'updated_at', 'item_count')
    search_fields = ('title', 'description', 'owner__username')
    list_filter = ('created_at', 'updated_at', 'owner')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [TodoItemInline]
    date_hierarchy = 'created_at'

    def item_count(self, obj):
        return obj.items.count()
    item_count.short_description = 'Number of Items'

@admin.register(TodoItem)
class TodoItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'todolist', 'priority', 'is_completed', 'due_date', 'created_at', 'completed_at')
    search_fields = ('title', 'description', 'todolist__title', 'todolist__owner__username')
    list_filter = (
        'is_completed', 
        'priority', 
        'due_date', 
        'created_at', 
        'updated_at', 
        'completed_at', 
        'todolist', 
        'todolist__owner',
    )
    readonly_fields = ('created_at', 'updated_at', 'completed_at')
    autocomplete_fields = ('todolist',)
    ordering = ('is_completed', '-priority', 'due_date')
    date_hierarchy = 'due_date'
    actions = ['mark_as_completed']

    @admin.action(description='Mark selected items as completed')
    def mark_as_completed(self, request, queryset):
        for item in queryset:
            item.complete()