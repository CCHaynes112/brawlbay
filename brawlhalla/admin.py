from django.contrib import admin

from .models import (
    BrawlhallaUser,
    BrawlhallaPlayerRankedLegend,
    BrawlhallaPlayerRanked,
    BrawlhallaPlayerLegend,
    BrawlhallaLegend,
    BrawlhallaClanUser,
    BrawlhallaClan,
)


@admin.register(BrawlhallaUser)
class BrawlhallaUserAdmin(admin.ModelAdmin):
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


@admin.register(BrawlhallaClanUser)
class BrawlhallaClanUserAdmin(admin.ModelAdmin):
    pass


@admin.register(BrawlhallaClan)
class BrawlhallaClanAdmin(admin.ModelAdmin):
    pass
