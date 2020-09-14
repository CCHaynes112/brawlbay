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
                return JsonResponse({"data": BrawlhallaPlayerSchema().dump(player)})
            else:
                updated_player = BrawlhallaClient().update_all_player_data(
                    brawlhalla_id
                )
                return JsonResponse(
                    {"data": BrawlhallaPlayerSchema().dump(updated_player)}
                )
        except ObjectDoesNotExist:
            created_player = BrawlhallaClient().update_all_player_data(brawlhalla_id)
            return JsonResponse({"data": BrawlhallaPlayerSchema().dump(created_player)})


class BrawlhallaPlayersView(View):
    def get(self, request):
        players = BrawlhallaPlayer.objects.all()[:5]
        return JsonResponse({"data": BrawlhallaPlayerSchema().dump(players, many=True)})


class TopRankedView(View):
    def get(self, request):
        player_count = int(request.GET.get("playerCount"))
        players = BrawlhallaPlayer.objects.filter(ranked__isnull=False).order_by(
            "-ranked__rating"
        )[:player_count]
        return JsonResponse({"data": BrawlhallaPlayerSchema().dump(players, many=True)})
