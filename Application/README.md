# Planifécation

Une application react avec une UI/UX qui est tout l'inverse de ce à quoi l'on pourrait s'attendre.

# Installation

1. **Installer les dépendances**

   ```bash
   yarn install
   ```

2. **Fichier de configuration**
   Il faut créer un fichier ".env.local" à la racine du dossier "Application" et insérer ces paramètres :

   ```
   URI_API="" //Point d'accès de l'API (URL)
   ENVIRONMENT="dev" //Ou "prod"
   ```

3. **Lancer le projet**

   ```bash
   yarn start
   ```

   Cela va démarrer EXPO. Suivez les instructions dans le terminal afin de pouvoir ouvrir l'application sur votre téléphone.

# Utilisation de Prettier

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

# Tests

Expliquez comment exécuter les tests automatisés pour ce système :

```bash
yarn test
```

# Troubleshooting

Si votre configuration de .env.local n'est pas prise en compte, veuillez lancer la commande :

```bash
yarn start --reset-cache
```
