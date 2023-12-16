import {createNativeStackNavigator} from '@react-navigation/native-stack';

export enum RootStackScreen {
  AUTH_HOME = 'AUTH_HOME',
  FIRST_STEP = 'FIRST_STEP',
  SECOND_STEP = 'SECOND_STEP',
  THIRD_STEP = 'THIRD_STEP',
  HOME = 'HOME',
  LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL',
  OAUTH_SCREEN = 'OAUTH_SCREEN',
  SPLASH = 'SPLASH',
  WELCOME_SCREEN = 'WELCOME_SCREEN',
}

export type RootStackScreenParamsList = {
  AUTH_HOME: undefined;
  FIRST_STEP: undefined;
  SECOND_STEP: undefined;
  THIRD_STEP: undefined;
  HOME: undefined;
  LOGIN_SUCCESSFUL: undefined;
  OAUTH_SCREEN: undefined;
  SPLASH: undefined;
  WELCOME_SCREEN: undefined;
};

const RootStack = createNativeStackNavigator<RootStackScreenParamsList>();

export default RootStack;
