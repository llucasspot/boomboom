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
  };
  component: {};
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
    };
  };
};

export default LanguageTranslationType;
