from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import Repair, Client
from django.contrib.auth.models import User


class RepairSerializer(serializers.ModelSerializer):
    dziuma_id = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    item_type = serializers.SerializerMethodField()

    class Meta:
        model = Repair
        fields = ['id', 'status', 'date_received',
                  'date_returned', 'dziuma_id',
                  'name', 'item_type', 'service_fee', 'extra_fee', 'comment']

    def get_dziuma_id(self, obj):
        d_id = obj.item.client.dziuma_id
        return d_id if obj.item and obj.item.client else None

    def get_name(self, obj):
        return obj.item.name if obj.item else None

    def get_item_type(self, obj):
        return obj.item.item_type if obj.item else None


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'first_name', 'last_name',
                  'phone', 'email', 'date_created', 'dziuma_id']
        read_only_fields = ['id', 'date_created', 'dziuma_id']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key', 'user')
