from rest_framework import serializers
from .models import userdb

class UserSerializer(serializers.Serializer):
    class Meta:
        model = userdb
        fields = ('username', 'password', 'first_name', 'last_name')