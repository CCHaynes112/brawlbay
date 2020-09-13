from secret_keys import brawl_key
import requests
import time
from ..models import BrawlhallaPlayer, BrawlhallaPlayerLegend, BrawlhallaLegend


class BrawlhallaClient:
    def get_steam_player(self, steam_id):
        """ Get id and name of player from steam id """
        return requests.get(
            "https://api.brawlhalla.com/search?steamid={0}&api_key={1}".format(
                steam_id, brawl_key
            )
        ).json()

    def get_player_data(self, id):
        """ Get general stats about a player, including stats about each legend """
        player_json = requests.get(
            "https://api.brawlhalla.com/player/{0}/stats?api_key={1}".format(
                id, brawl_key
            )
        ).json()

        legend_json = player_json.pop("legends")
        player_data = {
            "general_data": {
                "brawlhalla_id": player_json["brawlhalla_id"],
                "name": player_json["name"],
                "xp": player_json["xp"],
                "level": player_json["level"],
                "xp_percent": player_json["xp_percentage"],
                "games": player_json["games"],
                "wins": player_json["wins"],
                "damage_bomb": player_json["damagebomb"],
                "damage_mine": player_json["damagemine"],
                "damage_spikeball": player_json["damagespikeball"],
                "damage_sidekick": player_json["damagesidekick"],
                "hit_snowball": player_json["hitsnowball"],
                "ko_bomb": player_json["kobomb"],
                "ko_spike": player_json["kospikeball"],
                "ko_sidekick": player_json["kosidekick"],
                "ko_snowball": player_json["kosnowball"],
            },
            "legends": [],
        }
        for legend in legend_json:
            player_data.legends.append(
                {
                    "legend": legend["legend_id"],
                    "brawlhalla_player": player_json["brawlhalla_id"],
                    "name": legend["name"],
                    "xp": legend["xp"],
                    "level": legend["level"],
                    "xp_percent": legend["xp_percentage"],
                    "games": legend["games"],
                    "wins": legend["wins"],
                    "damage_bomb": legend["damagebomb"],
                    "damage_mine": legend["damagemine"],
                    "damage_spikeball": legend["damagespikeball"],
                    "damage_sidekick": legend["damagesidekick"],
                    "hit_snowball": legend["hitsnowball"],
                    "ko_bomb": legend["kobomb"],
                    "ko_spike": legend["kospikeball"],
                    "ko_sidekick": legend["kosidekick"],
                    "ko_snowball": legend["kosnowball"],
                }
            )

        return player_data

    def get_ranked_player_data(self, id):
        """ Get ranked stats about a player, including ranked stats about each legend """
        return requests.get(
            "https://api.brawlhalla.com/player/{0}/ranked?api_key={1}".format(
                id, brawl_key
            )
        ).json()

    def get_leaderboard_data(self, bracket, region, page_number):
        """ Get ranked leaderboard data """
        return requests.get(
            "https://api.brawlhalla.com/{0}/{1}/{2}?api_key={3}".format(
                bracket, region, page_number, brawl_key
            )
        ).json()

    def get_clan_data(self, clan_id):
        """ Get general clan information, including each clan member """
        return requests.get(
            "https://api.brawlhalla.com/clan/{0}?api_key={1}".format(clan_id, brawl_key)
        ).json()

    def get_all_legend_data(self):
        """ Get overview data about all legends """
        legends_json = requests.get(
            "https://api.brawlhalla.com/legend/all?api_key={0}".format(brawl_key)
        ).json()

        ids = []
        for legend in legends_json:
            ids.append(legend["legend_id"])
        return ids

    def get_legend_data(self, legend_id):
        """ Get detailed data about a legend """
        legend_response = requests.get(
            "https://api.brawlhalla.com/legend/{0}?api_key={1}".format(
                legend_id, brawl_key
            )
        ).json()
        return {
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

    def update_all_player_data(self, id):
        # Update player
        player_data = self.get_player_data(id)
        player, _ = BrawlhallaPlayer.objects.update_or_create(
            brawlhalla_id=player_data.general_data["brawlhalla_id"],
            defaults=player_data["general_data"],
        )
        # Update each player legend
        for legend in player_data["legends"]:
            BrawlhallaPlayerLegend.objects.update_or_create(
                legend=legend["legend"],
                brawlhalla_player=legend["brawlhalla_player"],
                defaults=legend,
            )
        # Update ranked
        # Update each ranked legend
        # Update Player Clan
        pass

    def update_all_legends(self):
        for id in self.get_all_legend_data():
            self.update_legend_detail(id)
            time.sleep(5)

    def update_legend_detail(self, id):
        legend_data = self.get_legend_data(id)
        BrawlhallaLegend.objects.update_or_create(
            legend_id=legend_data["legend_id"], defaults=legend_data
        )
        print("{0} updated/created".format(id))
