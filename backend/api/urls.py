from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'todolists', views.TodoListViewSet, basename='todolist')
router.register(r'todoitems', views.TodoItemViewSet, basename='todoitem')

urlpatterns = [
  path('register/', views.CreateUserView.as_view(), name='user-register'),
  path('', include(router.urls)),
]