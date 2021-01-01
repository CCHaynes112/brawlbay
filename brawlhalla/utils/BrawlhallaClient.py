from secret_keys import brawl_key
import requests
import time
from ..models import (
    BrawlhallaPlayer,
    BrawlhallaPlayerLegend,
    BrawlhallaLegend,
    BrawlhallaPlayerRanked,
    BrawlhallaPlayerRankedLegend,
    BrawlhallaClan,
    BrawlhallaClanPlayer,
)


class BrawlhallaDataConverter:
    def __init__(self):
        self.client = BrawlhallaClient()

    def get_player_data(self, id):
        player_json = self.client.get_player_data(id)
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

        if "clan" in player_json.keys():
            player_data["clan_id"] = player_json.pop("clan")["clan_id"]

        for legend in legend_json:
            player_data["legends"].append(
                {
                    "legend_id": legend["legend_id"],
                    # "brawlhalla_player_id": player_json["brawlhalla_id"],
                    # "name": legend["legend_name_key"],
                    "damage_dealt": legend["damagedealt"],
                    "damage_taken": legend["damagetaken"],
                    "kos": legend["kos"],
                    "falls": legend["falls"],
                    "suicides": legend["suicides"],
                    "team_kos": legend["teamkos"],
                    "match_time": legend["matchtime"],
                    "games": legend["games"],
                    "wins": legend["wins"],
                    "damage_unarmed": legend["damageunarmed"],
                    "damage_thrown": legend["damagethrownitem"],
                    "damage_weapon_one": legend["damageweaponone"],
                    "damage_weapon_two": legend["damageweapontwo"],
                    "damage_gadgets": legend["damagegadgets"],
                    "ko_unarmed": legend["kounarmed"],
                    "ko_thrown": legend["kothrownitem"],
                    "ko_weapon_one": legend["koweaponone"],
                    "ko_weapon_two": legend["koweapontwo"],
                    "ko_gadgets": legend["kogadgets"],
                    "time_held_weapon_one": legend["timeheldweaponone"],
                    "time_held_weapon_two": legend["timeheldweapontwo"],
                    "xp": legend["xp"],
                    "level": legend["level"],
                    "xp_percent": legend["xp_percentage"],
                }
            )

        return player_data

    def get_ranked_player_data(self, id):
        ranked_json = self.client.get_ranked_player_data(id)

        if ranked_json == {}:
            return None

        legend_json = ranked_json.pop("legends")
        ranked_json.pop("2v2")  # ranked_2v2_json = ranked_json.pop("2v2")
        ranked_data = {
            "general_data": {
                "rating": ranked_json["rating"],
                "peak_rating": ranked_json["peak_rating"],
                "tier": ranked_json["tier"],
                "wins": ranked_json["wins"],
                "games": ranked_json["games"],
                "region": ranked_json["region"],
                "global_rank": ranked_json["global_rank"],
                "region_rank": ranked_json["region_rank"],
            },
            "legends": [],
        }
        for legend in legend_json:
            ranked_data["legends"].append(
                {
                    "legend_id": legend["legend_id"],
                    "rating": legend["rating"],
                    "peak_rating": legend["peak_rating"],
                    "tier": legend["tier"],
                    "wins": legend["wins"],
                    "games": legend["games"],
                }
            )
        return ranked_data

    def get_clan_data(self, clan_id):
        clan_json = self.client.get_clan_data(clan_id)

        clan_members = clan_json.pop("clan")
        clan_data = {
            "general_data": {
                "clan_id": clan_json["clan_id"],
                "clan_name": clan_json["clan_name"],
                "clan_create_date": time.strftime(
                    "%Y-%m-%d %H:%M:%S", time.localtime(clan_json["clan_create_date"])
                ),
                "clan_xp": clan_json["clan_xp"],
            },
            "members": [],
        }
        for member in clan_members:
            clan_data["members"].append(
                {
                    "brawlhalla_id": member["brawlhalla_id"],
                    "rank": member["rank"],
                    "join_date": time.strftime(
                        "%Y-%m-%d %H:%M:%S", time.localtime(member["join_date"])
                    ),
                    "xp": member["xp"],
                }
            )
        return clan_data

    def update_all_player_data(self, id):
        # Update player
        player_data = self.get_player_data(id)
        player, _ = BrawlhallaPlayer.objects.update_or_create(
            brawlhalla_id=player_data["general_data"]["brawlhalla_id"],
            defaults=player_data["general_data"],
        )

        # Update each player legend
        for legend in player_data["legends"]:
            legend_id = legend.pop("legend_id")
            BrawlhallaPlayerLegend.objects.update_or_create(
                legend=BrawlhallaLegend.objects.get(legend_id=legend_id),
                brawlhalla_player=player,
                defaults=legend,
            )

        # Update clan
        if "clan_id" in player_data:
            clan_id = player_data["clan_id"]
            clan_data = self.get_clan_data(clan_id)
            clan, _ = BrawlhallaClan.objects.update_or_create(
                clan_id=clan_id,
                defaults=clan_data["general_data"],
            )

            # Update clan player
            for member in clan_data["members"]:
                member_id = member.pop("brawlhalla_id")
                if member_id == id:
                    BrawlhallaClanPlayer.objects.update_or_create(
                        clan=clan,
                        player=player,
                        defaults=member,
                    )

        # Update ranked
        ranked_data = self.get_ranked_player_data(id)
        if ranked_data is not None:
            ranked, _ = BrawlhallaPlayerRanked.objects.update_or_create(
                brawlhalla_player=player,
                defaults=ranked_data["general_data"],
            )

            # Update each ranked legend
            for legend in ranked_data["legends"]:
                legend_id = legend.pop("legend_id")
                BrawlhallaPlayerRankedLegend.objects.update_or_create(
                    ranked=ranked,
                    legend=BrawlhallaLegend.objects.get(legend_id=legend_id),
                    defaults=legend,
                )
        return player


class BrawlhallaClient:
    BRAWL_API_BASE = "https://api.brawlhalla.com/"

    def get_steam_player(self, steam_id):
        """ Get id and name of player from steam id """
        return requests.get(
            "{0}search?steamid={1}&api_key={2}".format(
                self.BRAWL_API_BASE, steam_id, brawl_key
            )
        ).json()

    def get_player_data(self, id):
        """ Get general stats about a player, including stats about each legend """
        return requests.get(
            "{0}player/{1}/stats?api_key={2}".format(self.BRAWL_API_BASE, id, brawl_key)
        ).json()

    def get_ranked_player_data(self, id):
        """ Get ranked stats about a player, including ranked stats about each legend """
        return requests.get(
            "https://api.brawlhalla.com/player/{0}/ranked?api_key={1}".format(
                id, brawl_key
            )
        ).json()

    def get_leaderboard_data(self, bracket, region, page_number, player_name=""):
        """ Get ranked leaderboard data """
        return requests.get(
            "{0}/rankings/{1}/{2}/{3}?api_key={4}&name={5}".format(
                self.BRAWL_API_BASE, bracket, region, page_number, brawl_key, player_name
            )
        ).json()

    def get_clan_data(self, clan_id):
        """ Get general clan information, including each clan member """
        return requests.get(
            "{0}/clan/{1}?api_key={2}".format(self.BRAWL_API_BASE, clan_id, brawl_key)
        ).json()

    def get_all_legend_data(self):
        """ Get overview data about all legends """
        return requests.get(
            "{0}/legend/all?api_key={1}".format(self.BRAWL_API_BASE, brawl_key)
        ).json()

    def get_legend_data(self, legend_id):
        """ Get detailed data about a legend """
        return requests.get(
            "{0}/legend/{1}?api_key={2}".format(
                self.BRAWL_API_BASE, legend_id, brawl_key
            )
        ).json()
