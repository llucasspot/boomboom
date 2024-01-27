# Boumboum app

Intégration du projet Bouboum de [Benjamin Code](https://www.youtube.com/watch?v=JDl3P7wZw50) en react native.

## Avancement du projet

[Démo intégration graphique](https://www.youtube.com/watch?v=QbPcjVUnF00&ab_channel=St%C3%A9phaneWouters)

### TODO

Intégration graphique :
- [x] Home page
- [x] Inscription étape 1 : choix avatar
- [x] Inscription étape 2 : Informations personnelles
- [x] Inscription étape 3 : Selection des musiques préférées
- [x] Matching
- [ ] Page édition de profil
- [ ] Page liste des matchs

Accessibilité :
- [ ] Dark mode (30%)
- [ ] Traduction en/fr (20%)

Branchement au backend :
- [ ] TODO à définir

## Développement

### Structure du projet

```
├── ...
├── swagger             : folder contenant les types du backend auto genérés depuis le swagger
└── src
    ├── api/
    ├── assets/
    ├── components/
    ├── hooks/
    ├── navigation/     : stacks react navigation
    ├── screens/        : screen utilisés dans la stack react navigation
    ├── services/       : services pour la gestion fonctionnelle & technique (states, i18n, storage, config, etc.)
    ├── tsyringe/       : config injection de dependance
    └── utils/          : utils divers
├── .env.exemple
├── App.tsx
└── ...
```

### Configuration

Dupliquer le fichier `.env.exemple` en `.env` pour adapter les variables d'environnement à votre configuration.

Pour travailler en local sans serveur avec des données mockées, passer la variable `EXPO_PUBLIC_MOCK_MODE` du `.env` a `true`

### Execution  

L'application utilise expo, vous n'avez donc pas besoin d'installer un environnement android ou ios.
suffit d'installer l'application [Expo GO](https://expo.dev/client) sur votre téléphone.

Installation des dépendances :
```
npm install
```

Générer les beans du backend :
```
npm run swagger:generate
```

Lancer l'application en mode développement:
```
npm run start
```

Puis scanner le QR code qui s'affiche dans le terminal avec l'application `Expo Go` sur votre téléphone.

### Liaison avec le backend

Pour travailler avec le serveur, passer la variable .env `EXPO_PUBLIC_MOCK_MODE` a `false`

Prendre la version modifiée du backend boomboom pour fonctionner avec l'implémentation sso :
https://github.com/llucasspot/boumboum-back



Ne pas oubliez de créer une app sso dans le [dashboard](https://developer.spotify.com/dashboard) dev spotify.  
Ne pas oubliez d'ajouter un utilisateur test


## Liens connexes

- [Vidéo de présesation du projet par  Benjamin Code](https://www.youtube.com/watch?v=JDl3P7wZw50&list=PL8x4xEF7H2YPU7ZFIACGiZmOEHY49IZ9E&ab_channel=BenjaminCode)
- [Maquettes Figma](https://www.figma.com/community/file/1316792772224536230/boumboum)
- [Code source backend](https://github.com/Benjamin-Code-YouTube/boumboum-back)

## Crédits

- Adaptation en typescript, organisation du code et branchement au backend par llucas.spot
- Intégration graphique et animations par [Stéphane Wouters](https://github.com/Doelia/boumboum-app)

Si vous récupérez notre travail, merci de créditer "llucas.spot" "Stéphane Wouters" et de nous en notifier.
