import { CreateOneProfileBodyGenderEnum } from "@boumboum/swagger-backend";

import { LanguageTranslationType } from "#modules/core/language/beans/LanguageTranslationType";

export const fr: LanguageTranslationType = {
  common: {
    over: "Terminer",
    description: "Description",
    next: "Suivant",
    toImplement: "A implémenter",
    fullName: "Nom complet",
    dateOfBirth: "Date de naissance",
    gender: "Genre",
    gendersToShow: "Genres à montrer",
    matches: "Matchs",
    profile: "Profil",
    cancel: "Annuler",
    stepperHeader: "Etape {{step}} sur {{numberOfStep}}",
  },
  component: {
    GenderButton: {
      [CreateOneProfileBodyGenderEnum.Female]: "Femme",
      [CreateOneProfileBodyGenderEnum.Male]: "Homme",
      [CreateOneProfileBodyGenderEnum.NonBinary]: "Non binaire",
    },
    ReturnButton: {
      back: "Retour",
    },
    UserProfileForm: {
      errorMessage: "Le champ est requis.",
    },
    RegisterStepper: {
      step: {
        "0": {
          title: "Télécharge ta photo de profil",
        },
        "1": {
          title: "Dis-nous en plus sur toi",
        },
        "2": {
          title: "Ajoute tes chansons favorites",
        },
      },
    },
  },
  screen: {
    SignInScreen: {
      spotifySignInButtonLabel: "Se connecter avec spotify",
      title: "Soyez prêt pour une incroyable aventure musicale!",
    },
    SignInSuccessfulScreen: {
      title: "Connexion réussi",
      subtitle: "Veuillez continuer pour renseigner vos informations de profil",
    },
    WelcomeScreen: {
      title: "Bienvenue Amoureux de la musique",
      subtitle: "Allons trouver votre amê soeur musicale",
      submitButton: "Commencez à matcher",
    },
    SongPicker: {
      searchBarPlaceholder: "Recherchez...",
    },
    MyProfile: {
      title: "Profil",
      saveButton: "Enregistrer",
    },
  },
  match: {
    AnimatedSectionButton: {
      orContinueToMatch: "Ou continue de matcher",
      contactYourMatch: "Contact ton match",
    },
    MyProfileScreen: {
      heyUsername: "Salut {{username}}",
    },
    CardHeader: {
      sayHelloTo: "Dis salut à...",
    },
    AnimatedHeader: {
      title: "Vos cœurs sont en harmonie",
      subtitle: "Boum Boum, c'est un match!",
    },
    HomeScreen: {
      noProfileToShow: "Pas de profile a montrer",
    },
    MenuHeader: {
      MyProfileSectionButtonLabel: "Profil",
      MyMatchesSectionButtonLabel: "Matchs",
    },
  },
  register: {
    FavoriteSongs: {
      addSong: "Ajoute un nouveau son...",
      removeSong: "Enlève un son avant d'en ajouter un nouveau",
    },
    SongPicker: {
      chooseWisely:
        "Votre compagnon va adorer vos chansons. Choisissez judicieusement!",
    },
  },
};
