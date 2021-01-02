from django.core.management.base import BaseCommand
from brawlhalla.utils.BrawlhallaClient import BrawlhallaClient
from brawlhalla.models import BrawlhallaLegend
import time


class Command(BaseCommand):
    help = "Grabs all legend information, and then updates their detai data one by one"

    def handle(self, *args, **options):
        legends_json = BrawlhallaClient().get_all_legend_data()

        for legend in legends_json:
            legend_id = legend["legend_id"]
            self.update_legend_detail(legend_id)
            time.sleep(5)
            print("{0} updated/created".format(legend_id))
        print("Finished updating legends")

    def update_legend_detail(self, legend_id):
        legend_response = BrawlhallaClient().get_legend_data(legend_id)
        legend_data = {
            "legend_id": legend_response["legend_id"],
            "legend_name": legend_response["legend_name_key"],
            "bio_name": legend_response["bio_name"],
            "bio_aka": legend_response["bio_aka"],
            "bio_quote": legend_response["bio_quote"],
            "bio_quote_about_attrib": legend_response["bio_quote_about_attrib"],
            "bio_quote_from": legend_response["bio_quote_from"],
            "bio_quote_from_attrib": legend_response["bio_quote_from_attrib"],
            "bio_text": legend_response["bio_text"],
            "bot_name": legend_response["bot_name"],
            "weapon_one": legend_response["weapon_one"],
            "weapon_two": legend_response["weapon_two"],
            "strength": legend_response["strength"],
            "dexterity": legend_response["dexterity"],
            "defense": legend_response["defense"],
            "speed": legend_response["speed"],
        }
        BrawlhallaLegend.objects.update_or_create(
            legend_id=legend_data["legend_id"], defaults=legend_data
        )
