import LanguageTranslationType from '../beans/LanguageTranslationType';

const en: LanguageTranslationType = {
  common: {
    description: 'Description',
    next: 'Continue',
    toImplement: 'To implement',
    fullName: 'Full Name',
    dateOfBirth: 'Date Of Birth',
    gender: 'Gender',
    over: 'Finish',
    matches: 'Matches',
    profile: 'Profile',
  },
  component: {},
  screen: {
    SignInScreen: {
      spotifySignInButtonLabel: 'Sign in with spotify',
      title: 'Get ready for an incredible musical adventure!',
    },
    SignInSuccessfulScreen: {
      title: 'Logged In Successfully !',
      subtitle:
        'You have been logged in successfully. Please enter the your details to complete your profile',
    },
    WelcomeScreen: {
      title: 'Welcome music lover',
      subtitle: "Let's try do find your music mate",
    },
  },
};

export default en;
