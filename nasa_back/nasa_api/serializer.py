from rest_framework import serializers
from .models import Comets

class CometsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comets
        fields = [
            'obj_name',  
            'p_ir',         
            'moid_au',      
            'w_deg',        
            'ref',
        ]