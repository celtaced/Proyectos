# Etapa 1: Construcción con Node
FROM node:20.19.0-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80