# Gebruik een Node.js-basisimage
FROM node:20

# Maak een werkdirectory aan
WORKDIR /app

# Kopieer `package.json` en `package-lock.json`
COPY package*.json ./

# Installeer de dependencies
RUN npm install

# Kopieer de rest van de applicatiecode
COPY . .

# Stel de poort in waarop de service zal draaien
EXPOSE 3000

# Start de applicatie
CMD ["node", "index.js"]
