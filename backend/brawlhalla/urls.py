from django.urls import path
from .views import BrawlhallaPlayerView, BrawlhallaPlayersView, BrawlhallaLeaderboardView, BrawlhallaPlayerSearchView

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
    path(
        "players/leaderboard",
        BrawlhallaLeaderboardView.as_view(),
        name="brawlhalla_top_players_view",
    ),
    path(
        "players/search",
        BrawlhallaPlayerSearchView.as_view(),
        name="brawlhalla_players_search_view",
    ),
]
