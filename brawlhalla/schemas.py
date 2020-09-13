from marshmallow import Schema, fields


class BrawlhallaUserSchema(Schema):
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
    created_at = fields.DateTime()
    updated_at = fields.DateTime()