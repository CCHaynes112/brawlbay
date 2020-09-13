from django.contrib import admin

from .models import (
    BrawlhallaPlayer,
    BrawlhallaPlayerRankedLegend,
    BrawlhallaPlayerRanked,
    BrawlhallaPlayerLegend,
    BrawlhallaLegend,
    BrawlhallaClanPlayer,
    BrawlhallaClan,
)


@admin.register(BrawlhallaPlayer)
class BrawlhallaPlayerAdmin(admin.ModelAdmin):
    pass


@admin.register(BrawlhallaPlayerRankedLegend)
class BrawlhallaPlayerRankedLegendAdmin(admin.ModelAdmin):
    pass


@admin.register(BrawlhallaPlayerRanked)
class BrawlhallaPlayerRankedAdmin(admin.ModelAdmin):
    pass


@admin.register(BrawlhallaPlayerLegend)
class BrawlhallaPlayerLegendAdmin(admin.ModelAdmin):
    pass


@admin.register(BrawlhallaLegend)
class BrawlhallaLegendAdmin(admin.ModelAdmin):
    pass


@admin.register(BrawlhallaClanPlayer)
class BrawlhallaClanPlayerAdmin(admin.ModelAdmin):
    pass


@admin.register(BrawlhallaClan)
class BrawlhallaClanAdmin(admin.ModelAdmin):
    pass
