FROM node:16 AS build

# Crear el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y el package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código del frontend
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Usar Nginx para servir la aplicación
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
