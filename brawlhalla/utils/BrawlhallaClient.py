from secret_keys import brawl_key
import requests
from ..models import BrawlhallaUser


class BrawlhallaClient:
    def get_user_data(self, id):
        return requests.get(
            "https://api.brawlhalla.com/player/"
            + str(id)
            + "/stats?api_key="
            + brawl_key
        ).json()

    def update_user_from_api(self, id):
        user_data = self.get_user_data(id)

        return BrawlhallaUser.objects.filter(
            brawlhalla_id=user_data["brawlhalla_id"]
        ).update(
            name=user_data["name"],
            xp=user_data["xp"],
            level=user_data["level"],
            xp_percent=user_data["xp_percentage"],
            games=user_data["games"],
            wins=user_data["wins"],
            damage_bomb=user_data["damagebomb"],
            damage_mine=user_data["damagemine"],
            damage_spikeball=user_data["damagespikeball"],
            damage_sidekick=user_data["damagesidekick"],
            hit_snowball=user_data["hitsnowball"],
            ko_bomb=user_data["kobomb"],
            ko_spike=user_data["kospikeball"],
            ko_sidekick=user_data["kosidekick"],
            ko_snowball=user_data["kosnowball"],
        )

    def update_user_legends_from_api(self, id):
        user_data = self.get_user_data(id)

        return BrawlhallaUser.objects.filter(
            brawlhalla_id=user_data["brawlhalla_id"]
        ).update(
            name=user_data["name"],
            xp=user_data["xp"],
            level=user_data["level"],
            xp_percent=user_data["xp_percentage"],
            games=user_data["games"],
            wins=user_data["wins"],
            damage_bomb=user_data["damagebomb"],
            damage_mine=user_data["damagemine"],
            damage_spikeball=user_data["damagespikeball"],
            damage_sidekick=user_data["damagesidekick"],
            hit_snowball=user_data["hitsnowball"],
            ko_bomb=user_data["kobomb"],
            ko_spike=user_data["kospikeball"],
            ko_sidekick=user_data["kosidekick"],
            ko_snowball=user_data["kosnowball"],
        )

    def create_user_from_api(self, id):
        user_data = self.get_user_data(id)

        return BrawlhallaUser.objects.create(
            brawlhalla_id=user_data["brawlhalla_id"],
            name=user_data["name"],
            xp=user_data["xp"],
            level=user_data["level"],
            xp_percent=user_data["xp_percentage"],
            games=user_data["games"],
            wins=user_data["wins"],
            damage_bomb=user_data["damagebomb"],
            damage_mine=user_data["damagemine"],
            damage_spikeball=user_data["damagespikeball"],
            damage_sidekick=user_data["damagesidekick"],
            hit_snowball=user_data["hitsnowball"],
            ko_bomb=user_data["kobomb"],
            ko_spike=user_data["kospikeball"],
            ko_sidekick=user_data["kosidekick"],
            ko_snowball=user_data["kosnowball"],
        )
