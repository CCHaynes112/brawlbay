from django.urls import path
from .views import BrawlhallaPlayerView, BrawlhallaPlayersView, TopRankedView

urlpatterns = [
    path(
        "players",
        BrawlhallaPlayersView.as_view(),
        name="brawlhalla_players_view",
    ),
    path(
        "players/<int:brawlhalla_id>",
        BrawlhallaPlayerView.as_view(),
        name="brawlhalla_player_view",
    ),
    path("topRanked", TopRankedView.as_view(), name="brawlhalla_top_ranked"),
]