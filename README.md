# Boumboum-app

Intégration du projet Bouboum de [Benjamin Code](https://www.youtube.com/watch?v=JDl3P7wZw50) en react native.

L'application n'est pas connectée au backend, elle utilise des données mokéees.


| ![](_docs/screenshots/home.png) | ![](_docs/screenshots/matching.png) | ![](_docs/screenshots/itsamatch.png) |
|----------------|-----------------|----------------|


## Démo vidéo

https://www.youtube.com/watch?v=QbPcjVUnF00&ab_channel=St%C3%A9phaneWouters

## Démo jouable

Vous pouvez facilement tester l'application boumboum sur votre téléphone sans récupérer le code source.

1. Installer l'application [Expo Go](https://expo.dev/client) sur votre téléphone
2. Scanner le QR code suivant correspondant à votre platforme :

| Android              | iOS |
|----------------------|-----|
| ![QR code Android](https://qr.expo.dev/eas-update?updateId=0181d522-690c-42ac-8e90-f889845f712a&appScheme=exp&host=u.expo.dev) |  ![Qr Code iOS](https://qr.expo.dev/eas-update?updateId=ccc1c0ad-ea51-4099-a855-01266edfa6e2&appScheme=exp&host=u.expo.dev)   |

## Structure du projet

```
├── ...
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

## Configuration

1. modification du fichier d'env

Ajoutez un fichier .env a la racine du project avec les variables suivants :

EXPO_PUBLIC_API_URL : base url du backend boomboom /api
EXPO_PUBLIC_BY_PASS_SIGN_IN_SCREEN : boolean pour bypass le login
EXPO_PUBLIC_MOCK_MODE : boolean pour utiliser des data mockées

2. Config dashboard dev Spotify

Ne pas oubliez de créer une app sso dans le [dashboard](https://developer.spotify.com/dashboard) dev spotify.  
Ne pas oubliez d'ajouter un utilisateur test

## Développement

1. Mise en place du backend boomboom is (EXPO_PUBLIC_MOCK_MODE = true)

Prendre la version modifier du backend boomboom pour fonctionner avec l'implémentation sso :
https://github.com/llucasspot/boumboum-back

2. Execution  

L'application utilise expo, vous n'avez donc pas besoin d'installer un environnement android ou ios.
suffit d'installer l'application [Expo GO](https://expo.dev/client) sur votre téléphone.

Lancer l'application en mode développement :
```
npm install
npm run start
```

Puis scanner le QR code qui s'affiche dans le terminal avec l'application `Expo Go` sur votre téléphone.

## TODO

Pages intégrées :
- [x] Home page
- [x] Inscription étape 1 : choix avatar
- [x] Inscription étape 2 : Informations personnelles
- [x] Inscription étape 3 : Selection des musiques préférées
- [x] Matching
- [ ] Page édition de profil
- [ ] Page liste des matchs

## Liens connexes

- [Vidéo de présesation du projet par  Benjamin Code](https://www.youtube.com/watch?v=JDl3P7wZw50&list=PL8x4xEF7H2YPU7ZFIACGiZmOEHY49IZ9E&ab_channel=BenjaminCode)
- [Maquettes Figma](https://www.figma.com/community/file/1316792772224536230/boumboum)
- [Code source backend](https://github.com/Benjamin-Code-YouTube/boumboum-back)

## Crédits

Integration maquette : Crédite"Stéphane Wouters"

Si vous récupérez notre travail, merci de créditer "Stéphane Wouters" et "llucas.spot" et de nous en notifier.
