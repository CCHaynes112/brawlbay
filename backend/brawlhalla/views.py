import datetime
import json
import re

from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View

from .models import BrawlhallaPlayer
from .schemas import BrawlhallaPlayerSchema
from .utils.BrawlhallaClient import BrawlhallaClient, BrawlhallaDataConverter


class BrawlhallaPlayerView(View):
    def get(self, request, brawlhalla_id):
        REFRESH_WAIT_TIME = 0
        refresh = request.GET.get("refresh") if "refresh" in request.GET else False
        try:
            player = BrawlhallaPlayer.objects.get(brawlhalla_id=brawlhalla_id)
            if refresh and timezone.now() - player.updated_at >= datetime.timedelta(
                minutes=REFRESH_WAIT_TIME
            ):
                player = BrawlhallaDataConverter().update_all_player_data(brawlhalla_id)
            return JsonResponse({"player": BrawlhallaPlayerSchema().dump(player)})
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
        page_number = (
            request.GET.get("page_number") if "page_number" in request.GET else "1"
        )

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


@csrf_exempt
def send_email(request):
    payload = json.loads(request.body).get("params", "")
    subject = payload.get("subject", "")
    message = payload.get("message", "")
    email = payload.get("email", "")

    if subject and message and email:
        try:
            send_mail(
                subject,
                message,
                f"Brawlbay <{email}>",
                ["CCHaynes1122@gmail.com"],
            )
        except BadHeaderError:
            return HttpResponse("Invalid header found.")
        return JsonResponse({"data": "Email sent"})
    else:
        # In reality we'd use a form class
        # to get proper validation errors.
        return HttpResponse("Make sure all fields are entered and valid.")
