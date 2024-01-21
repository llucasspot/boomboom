import { createNativeStackNavigator } from "@react-navigation/native-stack";

export enum RegisterStackScreen {
  LOGIN_SUCCESSFUL = "SignInSuccessfulScreen",
  REGISTRATION_SCREEN = "Registration",
  WELCOME_SCREEN = "WelcomeScreen",
}

export type RegisterStackParamsList = {
  [RegisterStackScreen.LOGIN_SUCCESSFUL]: undefined;
  [RegisterStackScreen.REGISTRATION_SCREEN]: undefined;
  [RegisterStackScreen.WELCOME_SCREEN]: undefined;
};

export const RegisterStack =
  createNativeStackNavigator<RegisterStackParamsList>();
