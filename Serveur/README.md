# Planifécation

Une application react avec une UI/UX qui est tout l'inverse de ce à quoi l'on pourrait s'attendre.

## Démarrage rapide

Ce guide vous aidera à mettre en route le projet sur votre machine locale à des fins de développement et de test.

### Prérequis

Listez tout ce dont vous avez besoin pour installer le logiciel et comment les installer :

- [Node.js](https://nodejs.org/)

### Installation

Un guide étape par étape qui vous dira comment obtenir un environnement de développement en cours d'exécution.

1. **Installer les dépendances**

   ```bash
   npm install
   ```

2. **Fichier de configuration**
   Il faut créer un fichier ".env" à la racine du dossier "Serveur" et insérer ces paramètres :
   ```
    DATABASE_URL="postgresql://postgres:@localhost:5432/postgres?schema=public" //URI de la Database
    SECRET_KEY="test" //Votre secret key
    PORT=4000 //Port d'écoute du serveur
   ```

3. **Migration de la structure de la base de donnée**
    ```bash
   npx prisma migrate dev --name "nomdemgiration"
   ```
   
4. **Lancer le projet**

   ```bash
   npm start
   ```

   Cela va démarrer le serveur GraphQL. Ouvrez `http://localhost:4000` sur un navigateur et accéder au site ApolloGraphQL.
