from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from .models import Repair, Client
from .serializers import RepairSerializer, ClientSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes)
from rest_framework.authentication import (
    SessionAuthentication,
    TokenAuthentication)
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from datetime import datetime, timedelta


class ClientCreateView(generics.CreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class ClientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    lookup_field = 'dziuma_id'


class RepairDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Repair.objects.all()
    serializer_class = RepairSerializer
    lookup_field = 'pk'


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed for {}".format(request.user.email))


@api_view(["POST"])
def login(request):
    user = get_object_or_404(User, username=request.data["username"])
    if not user.check_password(request.data["password"]):
        return Response(
            {"detail": "Not found."},
            status=status.HTTP_400_BAD_REQUEST)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token": token.key, "user": serializer.data})


@api_view(["POST"])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data["username"])
        user.set_password(request.data["password"])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RepairList(generics.ListAPIView):
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["date_received"]
    serializer_class = RepairSerializer

    def get_queryset(self):
        queryset = Repair.objects.all()

        # Get start_date and end_date from query parameters
        start_date_param = self.request.query_params.get("start_date", None)
        end_date_param = self.request.query_params.get("end_date", None)

        if start_date_param and end_date_param:
            # Convert string parameters to datetime objects
            start_date = datetime.strptime(start_date_param, "%Y-%m-%d").date()
            end_date = datetime.strptime(end_date_param, "%Y-%m-%d").date()
            + timedelta(days=1)

            # Filter queryset based on the date range
            queryset = queryset.filter(
                date_received__range=[start_date, end_date])

        return queryset


class SpecificRepairList(generics.ListAPIView):
    serializer_class = RepairSerializer
    throttle_classes = [AnonRateThrottle]

    def get_queryset(self):
        dziuma_id = self.kwargs.get("dziuma_id")
        return Repair.objects.filter(item__client__dziuma_id=dziuma_id)


class ClientList(generics.ListAPIView):
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["date_created"]
    serializer_class = ClientSerializer

    def get_queryset(self):
        queryset = Client.objects.all()

        # Get start_date and end_date from query parameters
        start_date_param = self.request.query_params.get("start_date", None)
        end_date_param = self.request.query_params.get("end_date", None)

        if start_date_param and end_date_param:
            # Convert string parameters to datetime objects
            start_date = datetime.strptime(start_date_param, "%Y-%m-%d").date()
            end_date = datetime.strptime(end_date_param, "%Y-%m-%d").date()
            + timedelta(days=1)

            # Filter queryset based on the date range
            queryset = queryset.filter(
                date_created__range=[start_date, end_date])

        return queryset


class UserLogin(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        # Authenticate the user
        authenticated_user = authenticate(username=username, password=password)

        if authenticated_user is not None:
            login(request, authenticated_user)
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {"token": token.key, "user": UserSerializer(user).data})
        else:
            return Response(
                {"detail": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED)
