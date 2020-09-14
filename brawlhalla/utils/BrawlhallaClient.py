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
        """ Get ranked stats about a player, including ranked stats about each legend """
        ranked_json = requests.get(
            "https://api.brawlhalla.com/player/{0}/ranked?api_key={1}".format(
                id, brawl_key
            )
        ).json()

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

    def get_leaderboard_data(self, bracket, region, page_number):
        """ Get ranked leaderboard data """
        leaderboard_data = requests.get(
            "https://api.brawlhalla.com/{0}/{1}/{2}?api_key={3}".format(
                bracket, region, page_number, brawl_key
            )
        ).json()

        ids = []
        for player in leaderboard_data:
            ids.append(player["brawlhalla_id"])
        return ids

    def get_clan_data(self, clan_id):
        """ Get general clan information, including each clan member """
        clan_json = requests.get(
            "https://api.brawlhalla.com/clan/{0}?api_key={1}".format(clan_id, brawl_key)
        ).json()

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

    def update_leaderboard_players(self, bracket, region, page_number):
        ids = self.get_leaderboard_data(bracket, region, page_number)
        for id in ids:
            self.update_all_player_data(id)

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
