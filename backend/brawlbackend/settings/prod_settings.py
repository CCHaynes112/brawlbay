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

sentry_sdk.init(
    dsn="https://884767598d50475c929963f13f5d09f8@o552500.ingest.sentry.io/5678395",
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True,
    environment="production",
)
