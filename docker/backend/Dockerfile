FROM python:3

WORKDIR /app
COPY ./backend/requirements.txt /app/backend/


RUN pip install --upgrade --no-cache-dir pip==21.0
RUN pip install --no-cache-dir gunicorn--20.0.4
RUN pip install -r --no-cache-dir backend/requirements.txt

COPY ./docker /app/docker
COPY ./backend /app/backend
WORKDIR /app/backend