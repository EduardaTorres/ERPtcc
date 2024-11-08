from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cliente
from .serializers import ClienteSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
# from rest_framework import permissions

class ClienteListCreateAPIView(generics.ListAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    pagination_class = PageNumberPagination

class ClienteCreateAPIView(generics.CreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    # permission_classes = [permissions.IsAuthenticated]

class ClienteRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    # permission_classes = [permissions.IsAuthenticated]

class ClienteDestroyAPIView(generics.DestroyAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    # permission_classes = [permissions.IsAuthenticated]

class ClienteUpdateAPIView(generics.UpdateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    # permission_classes = [permissions.IsAuthenticated]

class ClienteSeachAPIView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.query_params.get('query', None)
    
        if query:
            clienteSeach = Cliente.objects.filter(
                Q(NomePessoa__icontains=query) | Q(CPFouCNPJ__icontains=query)
            )
        else:
            clienteSeach = Cliente.objects.all()

        pagination_class = PageNumberPagination()
        pagination_class.page_size - 10

        resul_page = pagination_class.paginate_queryset(clienteSeach, request)

        serializer_class = ClienteSerializer(resul_page, many=True)

        return pagination_class.get_paginated_response(serializer_class.data)