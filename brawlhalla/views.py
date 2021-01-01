from django.views.generic import View
from .models import BrawlhallaPlayer
from .schemas import BrawlhallaPlayerSchema
from django.http import JsonResponse
from .utils.BrawlhallaClient import BrawlhallaClient, BrawlhallaDataConverter
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone
import datetime
import re


class BrawlhallaPlayerView(View):
    def get(self, request, brawlhalla_id):
        try:
            player = BrawlhallaPlayer.objects.get(brawlhalla_id=brawlhalla_id)
            if timezone.now() - player.updated_at < datetime.timedelta(minutes=30):
                return JsonResponse({"player": BrawlhallaPlayerSchema().dump(player)})
            else:
                updated_player = BrawlhallaDataConverter().update_all_player_data(
                    brawlhalla_id
                )
                return JsonResponse(
                    {"player": BrawlhallaPlayerSchema().dump(updated_player)}
                )
        except ObjectDoesNotExist:
            created_player = BrawlhallaDataConverter().update_all_player_data(
                brawlhalla_id
            )
            return JsonResponse(
                {"player": BrawlhallaPlayerSchema().dump(created_player)}
            )


class BrawlhallaPlayersView(View):
    def get(self, request):
        player_count_filter = (
            int(request.GET.get("playerCount")) if "playerCount" in request.GET else 50
        )
        sort_order = request.GET.get("sort") if "sort" in request.GET else "id"

        players = BrawlhallaPlayer.objects.all()
        if sort_order:
            players = players.order_by(sort_order)
        if player_count_filter:
            players = players[:player_count_filter]

        return JsonResponse(
            {"players": BrawlhallaPlayerSchema().dump(players, many=True)}
        )


class BrawlhallaLeaderboardView(View):
    def get(self, request):
        player_count_filter = (
            int(request.GET.get("playerCount")) if "playerCount" in request.GET else 50
        )
        bracket = request.GET.get("bracket") if "bracket" in request.GET else "1v1"
        region = request.GET.get("region") if "region" in request.GET else "all"
        page_number = request.GET.get("page_number") if "page_number" in request.GET else "1"

        data = BrawlhallaClient().get_leaderboard_data(bracket, region, page_number)[
            :player_count_filter
        ]
        return JsonResponse({"players": data})


class BrawlhallaPlayerSearchView(View):
    def get(self, request):
        search_param = request.GET.get("player")

        if re.search("[a-zA-Z]", search_param):
            # There are letters, can't be an id
            data = BrawlhallaClient().get_leaderboard_data(
                "1v1", "all", 1, search_param
            )
            return JsonResponse({"players": data})
        else:
            # Input is only numbers
            try:
                # Try to get user by ID
                data = BrawlhallaClient().get_player_data(search_param)
                return JsonResponse({"players": data})
            except Exception:
                # Try to get user by SteamID
                data = BrawlhallaClient().get_steam_player(search_param)
                return JsonResponse({"players": data})
        # Failed to find user
        return JsonResponse({"error": "Couldn't find player"})
