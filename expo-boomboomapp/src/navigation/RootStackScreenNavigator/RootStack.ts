import { createNativeStackNavigator } from "@react-navigation/native-stack";

export enum RootStackScreen {
  HOME = "HomeScreen",
}

export type RootStackParamsList = {
  [RootStackScreen.HOME]: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParamsList>();
