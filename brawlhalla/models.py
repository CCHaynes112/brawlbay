from django.db import models


class BrawlhallaPlayer(models.Model):
    brawlhalla_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=64)
    xp = models.IntegerField()
    level = models.IntegerField()
    xp_percent = models.DecimalField(max_digits=5, decimal_places=2)
    games = models.IntegerField()
    wins = models.IntegerField()
    damage_bomb = models.IntegerField()
    damage_mine = models.IntegerField()
    damage_spikeball = models.IntegerField()
    damage_sidekick = models.IntegerField()
    hit_snowball = models.IntegerField()
    ko_bomb = models.IntegerField()
    ko_spike = models.IntegerField()
    ko_sidekick = models.IntegerField()
    ko_snowball = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class BrawlhallaPlayerRanked(models.Model):
    brawlhalla_player = models.ForeignKey(
        BrawlhallaPlayer, on_delete=models.CASCADE, related_name="ranked"
    )
    rating = models.IntegerField()
    peak_rating = models.IntegerField()
    tier = models.CharField(max_length=32)
    wins = models.IntegerField()
    games = models.IntegerField()
    region = models.CharField(max_length=16)
    global_rank = models.IntegerField()
    region_rank = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class BrawlhallaLegend(models.Model):
    legend_id = models.IntegerField(unique=True)
    legend_name = models.CharField(max_length=32)
    bio_name = models.CharField(max_length=32)
    bio_aka = models.CharField(max_length=255)
    bio_quote = models.TextField()
    bio_quote_about_attrib = models.TextField()
    bio_quote_from = models.TextField()
    bio_quote_from_attrib = models.TextField()
    bio_text = models.TextField()
    bot_name = models.CharField(max_length=32)
    weapon_one = models.CharField(max_length=32)
    weapon_two = models.CharField(max_length=32)
    strength = models.IntegerField()
    dexterity = models.IntegerField()
    defense = models.IntegerField()
    speed = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{0} - {1}".format(self.legend_id, self.legend_name)


class BrawlhallaClan(models.Model):
    clan_id = models.IntegerField(unique=True)
    clan_name = models.CharField(max_length=64)
    clan_create_date = models.DateTimeField()
    clan_xp = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class BrawlhallaClanPlayer(models.Model):
    clan = models.ForeignKey(
        BrawlhallaClan, on_delete=models.CASCADE, related_name="clan_members"
    )
    player = models.OneToOneField(
        BrawlhallaPlayer, on_delete=models.CASCADE, related_name="clan_profile"
    )
    rank = models.CharField(max_length=32)
    join_date = models.DateTimeField()
    xp = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class BrawlhallaPlayerRankedLegend(models.Model):
    ranked = models.ForeignKey(
        BrawlhallaPlayerRanked, on_delete=models.CASCADE, related_name="legends"
    )
    legend = models.ForeignKey(
        BrawlhallaLegend, on_delete=models.CASCADE, related_name="ranked"
    )
    rating = models.IntegerField()
    peak_rating = models.IntegerField()
    tier = models.CharField(max_length=32)
    wins = models.IntegerField()
    games = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class BrawlhallaPlayerLegend(models.Model):
    brawlhalla_player = models.ForeignKey(
        BrawlhallaPlayer, on_delete=models.CASCADE, related_name="legends"
    )
    legend = models.ForeignKey(
        BrawlhallaLegend, on_delete=models.CASCADE, related_name="played_legends"
    )
    damage_dealt = models.IntegerField()
    damage_taken = models.IntegerField()
    kos = models.IntegerField()
    falls = models.IntegerField()
    suicides = models.IntegerField()
    team_kos = models.IntegerField()
    match_time = models.IntegerField()
    games = models.IntegerField()
    wins = models.IntegerField()
    damage_unarmed = models.IntegerField()
    damage_thrown = models.IntegerField()
    damage_weapon_one = models.IntegerField()
    damage_weapon_two = models.IntegerField()
    damage_gadgets = models.IntegerField()
    ko_unarmed = models.IntegerField()
    ko_thrown = models.IntegerField()
    ko_weapon_one = models.IntegerField()
    ko_weapon_two = models.IntegerField()
    ko_gadgets = models.IntegerField()
    time_held_weapon_one = models.IntegerField()
    time_held_weapon_two = models.IntegerField()
    xp = models.IntegerField()
    level = models.IntegerField()
    xp_percent = models.DecimalField(max_digits=5, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
