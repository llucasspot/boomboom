import LanguageTranslationType from '../beans/LanguageTranslationType';

const fr: LanguageTranslationType = {
  common: {
    over: 'Terminer',
    description: 'Description',
    next: 'Suivant',
    toImplement: 'A implémenter',
    fullName: 'Nom complet',
    dateOfBirth: 'Date de naissance',
    gender: 'Genre',
    matches: 'Matchs',
    profile: 'Profil',
  },
  component: {},
  screen: {
    SignInScreen: {
      spotifySignInButtonLabel: 'Se connecter avec spotify',
      title: 'Soyez prêt pour une incroyable aventure musicale!',
    },
    SignInSuccessfulScreen: {
      title: 'Connexion réussi',
      subtitle: 'Veuillez continuer pour renseigner vos informations de profil',
    },
    WelcomeScreen: {
      title: 'Bienvenue Amoureux de la musique',
      subtitle: 'Allons trouver votre amê soeur musicale',
    },
  },
};

export default fr;
