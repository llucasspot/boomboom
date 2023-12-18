import LanguageTranslationType from '../beans/LanguageTranslationType';

const en: LanguageTranslationType = {
  common: {
    description: 'Description',
    next: 'Next',
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
      title: 'Logged In Successfully',
      subtitle:
        'You have been log in successfully, please continue to enter your profile details',
    },
    WelcomeScreen: {
      title: 'Welcome music lover',
      subtitle: "Let's try do find your music mate",
    },
  },
};

export default en;
