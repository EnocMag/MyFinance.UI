# Build stage
FROM node:20-alpine AS build

# Instalar pnpm
RUN npm install -g pnpm@10.28.0

# Establecer directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install

# Copiar el código fuente
COPY . .

# Compilar la aplicación Angular
RUN pnpm run build

# Runtime stage
FROM nginx:alpine

# Copiar configuración de nginx
# COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos compilados desde el build stage
COPY --from=build /app/dist/my-finance-ui/browser /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
