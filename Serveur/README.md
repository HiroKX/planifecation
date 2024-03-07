# Planifécation - API GraphQL

Une application react avec une UI/UX qui est tout l'inverse de ce à quoi l'on pourrait s'attendre.

# Installation

1. **Fichier de configuration**
   Il faut créer un fichier ".env" à la racine du dossier "Serveur" et insérer ces paramètres :

   ```
   DATABASE_URL="postgresql://postgres:@localhost:5432/postgres?schema=public" #URI de la Database, en cas d'utilisation de Docker, remplacer "localhost" par "db"
   SECRET_KEY="test" #Votre secret key
   PORT=4000 #Port d'écoute du serveur
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=admin
   POSTGRES_DB=postgres
   ```

2. **Installer les dépendances**

   ```bash
   docker-compose up --build
   ```

   Cela va démarrer le serveur GraphQL. Ouvrez `http://localhost:4000` sur un navigateur et accéder au site ApolloGraphQL.

# Utilisation de Prettier

Pour maintenir un style de code cohérent, nous utilisons Prettier. Voici comment vous pouvez l'utiliser :

1. **Exécuter Prettier**

   Pour formater tous les fichiers de votre projet, utilisez :

   ```bash
   yarn prettier --write .
   ```

2. **Vérifier les fichiers non formatés**

   Pour vérifier si des fichiers n'ont pas été formatés avec Prettier, exécutez :

   ```bash
   yarn prettier --check .
   ```
