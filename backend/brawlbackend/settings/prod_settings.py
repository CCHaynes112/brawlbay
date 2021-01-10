from .base_settings import *

DEBUG = False

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": secret_keys.db_name,
        "USER": secret_keys.db_username,
        "PASSWORD": secret_keys.db_password,
        "HOST": "172.17.0.1",
        "PORT": 5432,
    }
}