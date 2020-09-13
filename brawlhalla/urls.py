from django.urls import path
from .views import BrawlhallaUsersView

urlpatterns = [
    path("users", BrawlhallaUsersView.as_view(), name="brawlhalla_users_view"),
]