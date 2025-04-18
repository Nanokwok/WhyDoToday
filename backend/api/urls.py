from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'todolists', views.TodoListViewSet, basename='todolist')
router.register(r'todoitems', views.TodoItemViewSet, basename='todoitem')
router.register(r'tags', views.TagViewSet, basename='tag')

urlpatterns = [
  path('register/', views.CreateUserView.as_view(), name='user-register'),
  path('', include(router.urls)),
  path('items/by-tag/<str:tag_name>/', views.TodoItemsByTagView.as_view(), name='items-by-tag'),
]