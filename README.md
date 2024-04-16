# Boumboum app

Intégration du projet Boumboum de [Benjamin Code](https://www.youtube.com/watch?v=JDl3P7wZw50) en react native.

## Avancement du projet

[Démo intégration graphique](https://www.youtube.com/watch?v=QbPcjVUnF00&ab_channel=St%C3%A9phaneWouters)

### TODO

Intégration graphique :

- [x] Inscription étape 1 : choix avatar
- [x] Inscription étape 2 : Informations personnelles
- [x] Inscription étape 3 : Selection des musiques préférées

- [x] Home page
- [x] Matching

- [ ] Page édition de profil
- [ ] Page liste des matchs

Accessibilité :
- [ ] Dark mode
- [x] Traduction en/fr

## Développement

### Structure du projet

```
├── ...
└── apps/                            => Applications du monorepo
    ├── backend/                     => Application NestJs Typescript
        ├── config/                  => Dossier config du backend
        └── src/
            ├── app/
            ├── core/                => Modules technique du project
            └── modules/             => Modules fonctionnels du project
    └── boumboumapp/                 => Application React Native Typescript
        └──src/
            ├── components/          => Components core
            ├── module_declarations/ => Declarations typescript externes
            └── modules/             => Modules fonctionnels du project
                                        en artichecture :
                                        
                                        ├── assets/         => Assets utilisés uniquement par le module
                                        ├── components/     => Components //
                                        ├── context/        => Context //
                                        ├── hooks/          => Hooks //
                                        ├── i18n/           => I18n keys utilisées dans le language.service.ts
                                        ├── screens/        => Screens //
                                        └── .navigator.ts   => Navigator du module (react navigation)
            └── App.tsx                            
        ├── .env           => Variables d'environnement
        └── index.js       => Main file
                                        
└── pakages/               => Packages du monorepo
    └── di/                  => Package d'injection de dependance du project front
└── swaggers/              => Projets Swagger autogénérés via openapi-generator-cli
    ├── backend/             => Beans Backend autogénérés pour le Frontend
    └── spotify/             => Beans Spotify autogénérés pour le Backend
└── ...
```

### Configuration Backend

La configuration du backend se trouve dans le dossier apps/backend/conf/.  
Vous pouvez ajouter un fichier `local.ts` qui ne sera pas commit pour votre conf local.  
Exemple :  
```typescript
export default definePartialConfig({
    database: {
        provider: SqliteDatabaseService,
        configs: {
            [DatabaseDialect.SQLITE]: {
                // alter: true,
            },
        },
    },
    ssoProviders: {
        spotify: {
            clientID: 'fbzyvczjhvbfzrfvzjhrvaz',
            clientSecret: 'hvbyzavuzyavfzayvrazyjv',
            callbackURL: 'http://localhost:4000/api/auth/spotify/callback',
            successURL: 'http://localhost:4000/api/auth/success',
        },
    },
});
```

### Configuration Boumboumapp

Dupliquer le fichier `.env.exemple` en `.env` pour adapter les variables d'environnement à votre configuration.  
Pour travailler en local sans serveur avec des données mockées, passer la variable `EXPO_PUBLIC_MOCK_MODE` du `.env` a `true`

### Execution

L'application utilise expo, vous n'avez donc pas besoin d'installer un environnement android ou ios.
suffit d'installer l'application [Expo GO](https://expo.dev/client) sur votre téléphone.

Installation des dépendances :
```
yarn install
```

Démarrer le backend :
```
cd apps/backend
yarn start:dev
```

Si modification, regénérer les beans le backend :
```
yarn swagger:backend:update
yarn swagger:backend:build
```

Lancer l'application en mode développement:
```
cd apps/boumboumapp
yarn start -c
```

Puis scanner le QR code qui s'affiche dans le terminal avec l'application `Expo Go` sur votre téléphone.

### Liaison avec le backend

Pour travailler avec le serveur, passer la variable .env `EXPO_PUBLIC_MOCK_MODE` a `false`

Ne pas oubliez de créer une app sso dans le [dashboard](https://developer.spotify.com/dashboard) dev spotify.  
Ne pas oubliez d'ajouter un utilisateur test

## Liens connexes

- [Vidéo de présesation du projet par  Benjamin Code](https://www.youtube.com/watch?v=JDl3P7wZw50&list=PL8x4xEF7H2YPU7ZFIACGiZmOEHY49IZ9E&ab_channel=BenjaminCode)
- [Maquettes Figma](https://www.figma.com/community/file/1316792772224536230/boumboum)

## Crédits

- Adaptation en Typescript, organisation du code et branchement au backend par llucas.spot
- Intégration graphique et animations par [Stéphane Wouters](https://github.com/Doelia/boumboum-app)

Si vous récupérez notre travail, merci de créditer "llucas.spot" "Stéphane Wouters" et de nous en notifier.
