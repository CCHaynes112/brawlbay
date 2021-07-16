from django.db.models import Q

from marshmallow import Schema, fields

from .models import BrawlhallaPlayerRankedTeam


class BrawlhallaPlayerLegendSchema(Schema):
    legend_name = fields.Method("get_legend_name")
    legend_id = fields.Method("get_legend_id")
    damage_dealt = fields.Integer()
    damage_taken = fields.Integer()
    kos = fields.Integer()
    falls = fields.Integer()
    suicides = fields.Integer()
    team_kos = fields.Integer()
    match_time = fields.Integer()
    games = fields.Integer()
    wins = fields.Integer()
    damage_unarmed = fields.Integer()
    damage_thrown = fields.Integer()
    damage_weapon_one = fields.Integer()
    damage_weapon_two = fields.Integer()
    damage_gadgets = fields.Integer()
    ko_unarmed = fields.Integer()
    ko_thrown = fields.Integer()
    ko_weapon_one = fields.Integer()
    ko_weapon_two = fields.Integer()
    ko_gadgets = fields.Integer()
    time_held_weapon_one = fields.Integer()
    time_held_weapon_two = fields.Integer()
    xp = fields.Integer()
    level = fields.Integer()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

    def get_legend_name(self, player_legend):
        return player_legend.legend.legend_name

    def get_legend_id(self, player_legend):
        return player_legend.legend.legend_id


class BrawlhallaPlayerRankedLegendSchema(Schema):
    legends = None  # TODO Put things here
    rating = fields.Integer()
    peak_rating = fields.Integer()
    tier = fields.String()
    wins = fields.Integer()
    games = fields.Integer()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


class BrawlhallaPlayerRankedTeamSchema(Schema):
    brawlhalla_player_1 = fields.Integer()
    brawlhalla_player_2 = fields.Integer()
    rating = fields.Integer()
    peak_rating = fields.Integer()
    tier = fields.String()
    wins = fields.Integer()
    games = fields.Integer()
    team_name = fields.String()
    region = fields.String()
    global_rank = fields.Integer()


class BrawlhallaPlayerRankedSchema(Schema):
    rating = fields.Integer()
    peak_rating = fields.Integer()
    tier = fields.String()
    wins = fields.Integer()
    games = fields.Integer()
    region = fields.String()
    global_rank = fields.Integer()
    region_rank = fields.Integer()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    ranked_teams = fields.Method("get_ranked_teams")

    def get_ranked_teams(self, ranked):
        return (
            BrawlhallaPlayerRankedTeamSchema(many=True).dump(
                BrawlhallaPlayerRankedTeam.objects.filter(
                    Q(brawlhalla_player_1=ranked.brawlhalla_player.brawlhalla_id)
                    | Q(brawlhalla_player_2=ranked.brawlhalla_player.brawlhalla_id)
                ).order_by("-games")
            )
            if BrawlhallaPlayerRankedTeam.objects.exists()
            else None
        )


class BrawlhallaPlayerSchema(Schema):
    brawlhalla_id = fields.Integer()
    name = fields.String()
    xp = fields.Integer()
    level = fields.Integer()
    xp_percent = fields.Decimal()
    games = fields.Integer()
    wins = fields.Integer()
    damage_bomb = fields.Integer()
    damage_mine = fields.Integer()
    damage_spikeball = fields.Integer()
    damage_sidekick = fields.Integer()
    hit_snowball = fields.Integer()
    ko_bomb = fields.Integer()
    ko_spike = fields.Integer()
    ko_sidekick = fields.Integer()
    ko_snowball = fields.Integer()
    created_at = fields.DateTime("%Y-%m-%d-%H:%M:%S", dump_only=True)
    updated_at = fields.DateTime("%Y-%m-%d-%H:%M:%S", dump_only=True)
    best_legend = fields.Method("get_best_legend")
    ranked = fields.Method("get_ranked")
    legends = fields.Method("get_legends")
    should_refresh = fields.Boolean()

    def get_legends(self, player):
        return (
            BrawlhallaPlayerLegendSchema(many=True).dump(
                player.legends.all().order_by("-games")
            )
            if player.legends.exists()
            else None
        )

    def get_ranked(self, player):
        return (
            BrawlhallaPlayerRankedSchema().dump(player.ranked.first())
            if player.ranked.exists()
            else None
        )

    def get_best_legend(self, player):
        return (
            player.legends.all().order_by("-wins").first().legend.legend_id
            if player.legends.exists()
            else None
        )
