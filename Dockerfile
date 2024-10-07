# Utilisation de l'image Node
FROM node:18.8-alpine as base

# Étape de construction
WORKDIR /home/node/app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Construire le projet (génère le dossier dist)
RUN npm run build

# Étape de production (alléger l'image de production)
FROM node:18.8-alpine as runtime

# Définir l'environnement de production
ENV NODE_ENV=production

WORKDIR /home/node/app

# Copier uniquement les fichiers nécessaires depuis l'étape de build
COPY --from=base /home/node/app/package*.json ./
COPY --from=base /home/node/app/node_modules ./node_modules
COPY --from=base /home/node/app/dist ./dist

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["node", "dist/server.js"]
