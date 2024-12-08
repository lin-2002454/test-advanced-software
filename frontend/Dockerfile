# Stap 1: Gebruik een officiële Node.js-image als basis
FROM node:20-alpine AS build

# Stel werkdirectory in
WORKDIR /app

# Kopieer package.json en package-lock.json naar de container
COPY package*.json ./

# Installeer dependencies
RUN npm install

# Kopieer de rest van de app-code naar de container
COPY . .

# Maak een productiebuild
RUN npm run build

# Stap 2: Gebruik een lichtgewicht image om statische bestanden te serveren
FROM nginx:alpine AS serve

# Kopieer de productiebuild van de vorige stap naar de nginx-serveermap
COPY --from=build /app/dist /usr/share/nginx/html

# Kopieer de aangepaste nginx.conf naar de container in de juiste map
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposeer poort 80 voor HTTP-verkeer
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
