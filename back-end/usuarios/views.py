from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import TokenSerializer, UsuarioSerializer, UsuarioTokenSerializer
from django.utils.timezone import now


class UsuarioLoginView(ObtainAuthToken):
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        user.last_login = now()
        user.save()

        token, created = Token.objects.get_or_create(user=user)
        
        user_serializer = UsuarioTokenSerializer(user)
        
        return Response({
            'user': user_serializer.data,
            'token': TokenSerializer(token).data,
        })
        
class UsuarioListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioTokenListAPIView(generics.ListAPIView):
    queryset = Token.objects.all()
    serializer_class = TokenSerializer

class UsuarioLogoutView(generics.DestroyAPIView):
    queryset = Token.objects.all()
    serializer_class = TokenSerializer