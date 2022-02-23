FROM python:3.9 as requirements-stage

WORKDIR /tmp

RUN pip install poetry

COPY ./pyproject.toml ./poetry.lock* /tmp/

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

COPY --from=requirements-stage /tmp/requirements.txt /app/app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/app/requirements.txt

COPY ./app /app/app
