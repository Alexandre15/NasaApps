from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import CometsSerializer
from .models import Comets

class CometView(APIView):
    def get(self, request):
        comets = Comets.objects.all()
        serializer = CometsSerializer(comets, many=True)  # Use serializer to format data
        return Response({'comets': serializer.data})

    def post(self, request):
        serializer = CometsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the validated data
            return Response({'status': 'success', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            comet = Comets.objects.get(obj_name=request.data['obj_name'])
            serializer = CometsSerializer(comet, data=request.data, partial=True)  # Use partial=True for partial updates
            if serializer.is_valid():
                serializer.save()
                return Response({'status': 'success', 'data': serializer.data}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Comets.DoesNotExist:
            return Response({'error': 'Comet not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        try:
            comet = Comets.objects.get(obj_name=request.data['obj_name'])
            comet.delete()
            return Response({'status': 'success', 'message': 'Comet deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Comets.DoesNotExist:
            return Response({'error': 'Comet not found'}, status=status.HTTP_404_NOT_FOUND)