from django.views.generic import View
from .models import BrawlhallaPlayer
from .schemas import BrawlhallaPlayerSchema
from django.http import JsonResponse
from .utils.BrawlhallaClient import BrawlhallaClient
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone
import datetime


class BrawlhallaPlayerView(View):
    def get(self, request, brawlhalla_id):
        try:
            player = BrawlhallaPlayer.objects.get(brawlhalla_id=brawlhalla_id)
            if timezone.now() - player.updated_at < datetime.timedelta(minutes=30):
                return JsonResponse({"player": BrawlhallaPlayerSchema().dump(player)})
            else:
                updated_player = BrawlhallaClient().update_all_player_data(
                    brawlhalla_id
                )
                return JsonResponse(
                    {"player": BrawlhallaPlayerSchema().dump(updated_player)}
                )
        except ObjectDoesNotExist:
            created_player = BrawlhallaClient().update_all_player_data(brawlhalla_id)
            return JsonResponse({"player": BrawlhallaPlayerSchema().dump(created_player)})


class BrawlhallaPlayersView(View):
    def get(self, request):
        player_count_filter = int(request.GET.get("playerCount")) if "playerCount" in request.GET else 50
        sort_order = request.GET.get("sort") if "sort" in request.GET else "id"

        players = BrawlhallaPlayer.objects.all()
        if sort_order:
            players = players.order_by(sort_order)
        if player_count_filter:
            players = players[:player_count_filter]

        return JsonResponse({"players": BrawlhallaPlayerSchema().dump(players, many=True)})
