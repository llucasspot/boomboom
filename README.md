# Titre du Projet

Ce fichier README a pour but de fournir toutes les informations nécessaires pour comprendre, installer et exécuter le projet React Native. Ce projet utilise une architecture modulaire et scalable, adaptée à des applications de taille moyenne à grande.

## Sommaire

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Structure du Projet](#structure-du-projet)
- [Configuration](#configuration)
- [Exécution](#exécution)

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- Node.js (version recommandée: >=16.0)
- npm ou Yarn
- [React Native](#https://reactnative.dev/docs/environment-setup)
- Un emulateur pour exécuter l'application (iOS/Android)

## Installation

Pour installer le projet, suivez ces étapes :

1. Clonez le dépôt :

```bash
git clone [url_du_dépôt]
```
   
2. Accéder au dossier du projet

```bash
cd boomboomapp
```

3. Installer les dépendances :

```bash
npm install
# ou
yarn install
```

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

API_URL : base url du backend boomboom /api
BY_PASS_SIGN_IN_SCREEN : boolean pour bypass le login

2. Config dashboard dev Spotify
   
Ne pas oubliez de créer une app sso dans le [dashboard](https://developer.spotify.com/dashboard) dev spotify.  
Ne pas oubliez d'ajouter un utilisateur test

## Execution

1. Mise en place du backend boomboom

prendre la version modifier du backend boomboom pour fonctionner avec l'implémentation sso :
https://github.com/llucasspot/boumboum-back

2. éxécution de l'app

```bash
yarn run start --reset-cache
```
