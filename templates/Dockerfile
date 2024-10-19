FROM directus/directus:latest

WORKDIR /directus

COPY extension-registry/local/ /directus/extensions/
COPY extension-registry/plugins/ /directus/extensions/
COPY .env  /directus/.env

EXPOSE 8055