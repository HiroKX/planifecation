# Utiliser une image Node.js officielle comme image de base
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock si vous utilisez Yarn)
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install --ignore-scripts

# Copier les fichiers du projet dans le conteneur
COPY . .

# Définir la commande pour démarrer le serveur Apollo
CMD ["npm", "run", "start:docker"]
