# Planifécation

Une application react avec une UI/UX qui est tout l'inverse de ce à quoi l'on pourrait s'attendre.

## Démarrage rapide

Ce guide vous aidera à mettre en route le projet sur votre machine locale à des fins de développement et de test.

### Prérequis

Listez tout ce dont vous avez besoin pour installer le logiciel et comment les installer :

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Installation

Un guide étape par étape qui vous dira comment obtenir un environnement de développement en cours d'exécution.

1. **Cloner le dépôt**

   ```bash
   git clone [https://github.com/HiroKX/planifecation.git]
   cd [planifecation]
   ```

2. **Installer les dépendances**

   ```bash
   yarn install
   ```
   
3. **Fichier de configuration**
   Il faut créer un fichier ".env.local" et insérer ces paramètres :
   ```
   URI_API="" //Point d'accès de l'API (URL)
   ENVIRONMENT="dev" //Ou "prod"
   ```

4. **Lancer le projet**

   ```bash
   yarn start
   ```

   Cela va démarrer le serveur de développement. Ouvrez `http://localhost:3000` pour voir votre application.

## Utilisation de Prettier

Pour maintenir un style de code cohérent, nous utilisons Prettier. Voici comment vous pouvez l'utiliser :

1. **Exécuter Prettier**

   Pour formater tous les fichiers de votre projet, utilisez :

   ```bash
   yarn prettier --write .
   ```

   Pour formater des fichiers spécifiques, spécifiez leurs chemins :

   ```bash
   yarn prettier --write src/**/*.ts
   ```

2. **Vérifier les fichiers non formatés**

   Pour vérifier si des fichiers n'ont pas été formatés avec Prettier, exécutez :

   ```bash
   yarn prettier --check .
   ```

## Tests

Expliquez comment exécuter les tests automatisés pour ce système :

```bash
yarn test
```

## Licence

Pas encore de licence. :(
