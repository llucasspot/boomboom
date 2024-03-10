import { Gender } from "../../UserService/userServiceI";
import LanguageTranslationType from "../beans/LanguageTranslationType";

const fr: LanguageTranslationType = {
  common: {
    over: "Terminer",
    description: "Description",
    next: "Suivant",
    toImplement: "A implémenter",
    fullName: "Nom complet",
    dateOfBirth: "Date de naissance",
    gender: "Genre",
    matches: "Matchs",
    profile: "Profil",
    cancel: "Annuler",
    stepperHeader: "Etape {{step}} sur {{numberOfStep}}",
  },
  component: {
    GenderButton: {
      [Gender.FEMALE]: "Femme",
      [Gender.MALE]: "Homme",
      [Gender.NO_SPECIFIC]: "Neutre",
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
};

export default fr;
