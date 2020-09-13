from django.views.generic import View
from django.shortcuts import get_object_or_404
from .models import BrawlhallaUser
from .schemas import BrawlhallaUserSchema
from django.http import JsonResponse


# 5 minutes
API_REFRESH_RATE = 60 * 5


class BrawlhallaUserView(View):
    def get(self, request, brawlhalla_id):
        try:
            user = BrawlhallaUser.objects.get(brawlhalla_id=brawlhalla_id)
            if user.updated_at < API_REFRESH_RATE:
                return JsonResponse({"data": BrawlhallaUserSchema().dump(user)})
            else:
                # Get user from API
                # Update user
                # Return updated user
        except ObjectDoesNotExist:
            # Create user from API


class BrawlhallaUsersView(View):
    def get(self, request):
        users = BrawlhallaUser.objects.all()[:5]
        return JsonResponse({"data": BrawlhallaUserSchema().dump(users, many=True)})
