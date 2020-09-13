from django.urls import path
from .views import BrawlhallaUserView, BrawlhallaUsersView

urlpatterns = [
    path(
        "users",
        BrawlhallaUsersView.as_view(),
        name="brawlhalla_users_view",
    ),
    path(
        "users/<int:brawlhalla_id>",
        BrawlhallaUserView.as_view(),
        name="brawlhalla_user_view",
    ),
]