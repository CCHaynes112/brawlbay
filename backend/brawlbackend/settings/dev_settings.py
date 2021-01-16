import os
from .base_settings import *

DEBUG = True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "brawlbay",
        "USER": "postgres",
        "PASSWORD": "brawlbay",
        "HOST": "postgres",
        "PORT": 5432,
    }
}
