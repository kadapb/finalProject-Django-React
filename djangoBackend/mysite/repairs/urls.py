from django.urls import path, re_path
from rest_framework.authtoken.views import ObtainAuthToken
from .views import (
    RepairList,
    SpecificRepairList,
    ClientList,
    ClientDetailView,
    RepairDetailView,
    ClientCreateView,
    login,
    signup,
    test_token,
)


urlpatterns = [
    path("repairs/", RepairList.as_view()),
    path("repairs/<str:dziuma_id>/",
         SpecificRepairList.as_view(),
         name="specific-repair-detail",
         ),
    path("clients/", ClientList.as_view()),
    path("clients/<str:dziuma_id>/",
         ClientDetailView.as_view(),
         name="client-detail"
         ),
    path("repair/<int:pk>/",
         RepairDetailView.as_view(),
         name="repair-detail"
         ),
    re_path("login", login),
    re_path("signup", signup),
    re_path("test_token", test_token),
    path('api/token/', ObtainAuthToken.as_view(), name='api_token'),
    path('create/client/', ClientCreateView.as_view(), name='client-create'),
]
