import { Gender } from "../../UserService/userServiceI";

type LanguageTranslationType = {
  common: {
    matches: string;
    profile: string;
    over: string;
    description: string;
    next: string;
    toImplement: string;
    fullName: string;
    dateOfBirth: string;
    gender: string;
    cancel: string;
    stepperHeader: string;
  };
  component: {
    GenderButton: {
      [key in Gender]: string;
    };
    ReturnButton: {
      back: string;
    };
    UserProfileForm: {
      errorMessage: string;
    };
  };
  screen: {
    SignInScreen: {
      title: string;
      spotifySignInButtonLabel: string;
    };
    SignInSuccessfulScreen: {
      title: string;
      subtitle: string;
    };
    WelcomeScreen: {
      title: string;
      subtitle: string;
      submitButton: string;
    };
    SongPicker: {
      searchBarPlaceholder: string;
    };
    MyProfile: {
      title: string;
      saveButton: string;
    };
  };
};

export default LanguageTranslationType;
