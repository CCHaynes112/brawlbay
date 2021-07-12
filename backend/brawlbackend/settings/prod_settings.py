from .base_settings import *  # noqa
import os
import logging
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from logdna import LogDNAHandler

DEBUG = False

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": secret_keys.db_name,  # noqa
        "USER": secret_keys.db_username,  # noqa
        "PASSWORD": secret_keys.db_password,  # noqa
        "HOST": "172.17.0.1",
        "PORT": 5432,
    }
}

sentry_sdk.init(
    dsn="https://884767598d50475c929963f13f5d09f8@o552500.ingest.sentry.io/5678395",
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True,
    environment="production",
)

LOGGING = {
    "version": 1,
    "handlers": {
        "logdna": {
            "level": logging.INFO,
            "class": "logging.handlers.LogDNAHandler",
            "key": secret_keys.log_dna_key,
            "options": {
                "app": "BrawlBay",
                "env": "production",
                "index_meta": False,
                "verbose": True,
                "hostname": "https://www.brawlbay.com",
            },
        }
    },
    "loggers": {
        "django": {
            "handlers": ["logdna"],
            "level": logging.WARNING
        }
    },
}