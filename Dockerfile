# ---------- Etapa 1: build (Node compila Vue a archivos estáticos) ----------
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Las variables VITE_ se necesitan EN EL BUILD, no al ejecutar el contenedor.
ARG VITE_WELCOME_MESSAGE="Hola desde Docker"
ARG VITE_APP_NAME="Frontend Demo"
ARG VITE_APP_ENV=docker
ARG VITE_APP_VERSION=1.0.0
ENV VITE_WELCOME_MESSAGE=$VITE_WELCOME_MESSAGE \
    VITE_APP_NAME=$VITE_APP_NAME \
    VITE_APP_ENV=$VITE_APP_ENV \
    VITE_APP_VERSION=$VITE_APP_VERSION

RUN npm run build

# ---------- Etapa 2: runtime (Nginx solo sirve archivos) ----------
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://localhost/ >/dev/null || exit 1
