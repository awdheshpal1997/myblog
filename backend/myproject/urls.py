from django.urls import path

from . import views
urlpatterns = [
    path('registration/', views.registration, name='registration'),
    path('login/', views.login, name='login'),
    path('blog_update/<int:id>', views.blog_update, name='blog_update'),
    path('all_view/', views.all_view, name='all_view'),
    path('user_view/', views.user_view, name='user_view'),
    path('blog/', views.blog, name='blog')

]