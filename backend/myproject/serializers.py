from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

from .import models


class RegistrationSerializer(serializers.ModelSerializer):
        first_name = serializers.CharField(required=True)
        last_name = serializers.CharField(required=True)
        username = serializers.CharField(max_length=20, required=True, validators=[UniqueValidator(queryset=User.objects.all())])
        email = serializers.EmailField(required=False, validators=[UniqueValidator(queryset=User.objects.all())])
        password = serializers.CharField(min_length=8, write_only=True, required=True)
        is_staff = serializers.BooleanField(default=True)

        class Meta:
                model = User
                fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password','is_staff']

        def get_first_name(self, obj):
            return obj.first_name

        def get_last_name(self, obj):
            return obj.last_name


class BlogdataSerilizer(serializers.ModelSerializer):
    class Meta:
        model = models.BlogData
        fields = ['id', 'title', 'content', 'user']
