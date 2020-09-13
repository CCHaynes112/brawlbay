from django.views.generic import View
from .models import BrawlhallaUser


class BrawlhallaUsersView(View):
    def get(self, brawlhalla_id):
        user = BrawlhallaUser.objects.all()
        return user
