# Utilisation de l'image Node
FROM node:18.8-alpine as base

# Étape de construction
FROM base as builder

WORKDIR /home/node/app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances de développement
RUN npm install

# Copier tous les fichiers pour la construction
COPY . .

# Construire le projet
RUN npm run build

# Étape de production
FROM base as runtime

# Définir l'environnement de production
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /home/node/app

# Copier les fichiers package.json et package-lock.json pour installer uniquement les dépendances de production
COPY package*.json ./

# Installer uniquement les dépendances nécessaires à la production
RUN npm install --omit=dev

# Copier les fichiers construits de l'étape builder
COPY --from=builder /home/node/app/dist ./dist

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["node", "dist/server.js"]
