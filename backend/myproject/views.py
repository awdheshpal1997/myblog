from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.admin import User
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from myproject import models
from .serializers import serializers, RegistrationSerializer, BlogdataSerilizer
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

#for registartion
@api_view(['POST'])
def registration(request):
    password = request.data['password']
    serializer = RegistrationSerializer(data={**request.data, 'password':make_password(password)})
    if serializer.is_valid():
        serializer.save()
        user = User.objects.last()
        #token, _ = Token.objects.get_or_create(user_id=user.id)

        token = RefreshToken.for_user(user)
        serializer1 = RegistrationSerializer(user).data
        serializer1["token"] = str(token.access_token)
        return Response(data=serializer1, status=status.HTTP_201_CREATED)
    else:
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#for login
@api_view(['POST'])
#@authentication_classes([TokenAuthentication])
def login(request):
    try:
        data = request.data
        username = data["username"]
        password = data["password"]
        useritem = User.objects.get(username=username)
        if useritem.check_password(password):
           #token,_ = Token.objects.get_or_create(user_id=useritem.id)
           token = RefreshToken.for_user(useritem)
           user = RegistrationSerializer(useritem).data
           user["token"] = str(token.access_token)
           return Response(data=user, status=status.HTTP_200_OK)
        else:
            message = {'detail': "user with this password does not exist"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)
    except:
        massage = {'detail':"user or password does not match"}
        return Response(massage, status=status.HTTP_401_UNAUTHORIZED)

#blog
@api_view(['POST'])
def blog(request):
    if request.method == 'POST':
        req_data = BlogdataSerilizer(data=request.data)
        if req_data.is_valid():
            req_data.save()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=req_data.errors)
        blog_created = models.BlogData.objects.last()
        response_blog = BlogdataSerilizer(blog_created)
        return Response(status=status.HTTP_201_CREATED, data=response_blog.data)
@api_view(['GET', 'PUT', 'DELETE'])
#@permission_classes(IsAuthenticated)
def blog_update(request, id):
    if request.method == "PUT":
        all_blog = models.BlogData.objects.get(user=request.user.id, id=id)
        response_blog = BlogdataSerilizer(all_blog, data=request.data)
        if response_blog.is_valid():
            response_blog.save()
            return Response(status=status.HTTP_200_OK, data=response_blog.data)
        return Response(response_blog.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        all_blog = models.BlogData.objects.get(user=request.user.id, id=id)
        all_blog.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
#@permission_classes(IsAuthenticated)
def all_view(request):
    if request.method == 'GET':
        all_blog = models.BlogData.objects.all()
        response_blog = BlogdataSerilizer(all_blog, many=True)
        return Response(status=status.HTTP_200_OK, data=response_blog.data)
@api_view(['GET'])
#@permission_classes(IsAuthenticated)
def user_view(request):
    if request.method == 'GET':
        blog_data=models.BlogData.objects.filter(user=request.user.id)
        response_data = BlogdataSerilizer(blog_data, many=True)
        return Response(data=response_data.data, status=status.HTTP_200_OK)


