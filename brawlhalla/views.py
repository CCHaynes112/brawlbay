from django.views.generic import View
from .models import BrawlhallaUser
from .schemas import BrawlhallaUserSchema
from django.http import JsonResponse
from .utils.BrawlhallaClient import BrawlhallaClient
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone
import datetime


class BrawlhallaUserView(View):
    def get(self, request, brawlhalla_id):
        try:
            user = BrawlhallaUser.objects.get(brawlhalla_id=brawlhalla_id)
            if timezone.now() - user.updated_at < datetime.timedelta(minutes=5):
                return JsonResponse({"data": BrawlhallaUserSchema().dump(user)})
            else:
                # Get user from API
                # Update user
                client = BrawlhallaClient()
                updated_user = client.update_user_from_api(brawlhalla_id)
                # Return updated user
                return JsonResponse({"data": BrawlhallaUserSchema().dump(updated_user)})
        except ObjectDoesNotExist:
            # Create user from API
            client = BrawlhallaClient()
            created_user = client.create_user_from_api(brawlhalla_id)
            return JsonResponse({"data": BrawlhallaUserSchema().dump(created_user)})


class BrawlhallaUsersView(View):
    def get(self, request):
        users = BrawlhallaUser.objects.all()[:5]
        return JsonResponse({"data": BrawlhallaUserSchema().dump(users, many=True)})
