import { CreateOneProfileBodyGenderEnum } from "@boumboum/swagger-backend";

import { LanguageTranslationType } from "#modules/core/language/beans/LanguageTranslationType";

export const en: LanguageTranslationType = {
  common: {
    description: "Description",
    next: "Continue",
    toImplement: "To implement",
    fullName: "Full Name",
    dateOfBirth: "Date Of Birth",
    gender: "Gender",
    gendersToShow: "Genders to show",
    over: "Finish",
    matches: "Matches",
    profile: "Profile",
    cancel: "Cancel",
    stepperHeader: "Step {{step}} of {{numberOfStep}}",
  },
  component: {
    GenderButton: {
      [CreateOneProfileBodyGenderEnum.Female]: "Female",
      [CreateOneProfileBodyGenderEnum.Male]: "Male",
      [CreateOneProfileBodyGenderEnum.NonBinary]: "No binary",
    },
    ReturnButton: {
      back: "Back",
    },
    UserProfileForm: {
      errorMessage: "This is required.",
    },
    RegisterStepper: {
      step: {
        "0": {
          title: "Upload profile picture",
        },
        "1": {
          title: "Tell us more about you",
        },
        "2": {
          title: "Add favorites songs",
        },
      },
    },
  },
  screen: {
    SignInScreen: {
      spotifySignInButtonLabel: "Sign in with spotify",
      title: "Get ready for an incredible musical adventure!",
    },
    SignInSuccessfulScreen: {
      title: "Logged In Successfully !",
      subtitle:
        "You have been logged in successfully. Please enter the your details to complete your profile",
    },
    WelcomeScreen: {
      title: "Welcome music lover",
      subtitle: "Let’s try to find your music mate",
      submitButton: "Start matching",
    },
    SongPicker: {
      searchBarPlaceholder: "Search...",
    },
    MyProfile: {
      title: "Profile",
      saveButton: "Save",
    },
  },
  match: {
    AnimatedSectionButton: {
      orContinueToMatch: "Or continue to match",
      contactYourMatch: "Contact your match",
    },
    MyProfileScreen: {
      heyUsername: "Hey {{username}}",
    },
    CardHeader: {
      sayHelloTo: "Say hello to...",
    },
    AnimatedHeader: {
      title: "Your hearts in tunes",
      subtitle: "Boum Boum, it's a match!",
    },
    HomeScreen: {
      noProfileToShow: "No users to show",
    },
    MenuHeader: {
      MyProfileSectionButtonLabel: "Profile",
      MyMatchesSectionButtonLabel: "Matches",
    },
  },
  register: {
    FavoriteSongs: {
      addSong: "Add a new song...",
      removeSong: "Remove a song before adding a new one",
    },
    SongPicker: {
      chooseWisely: "Your mate will love your songs. Choose wisely!",
    },
  },
};
