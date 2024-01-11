import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RegistrationStackScreenParamsList = Record<string, undefined>;

export const RegistrationStack =
  createNativeStackNavigator<RegistrationStackScreenParamsList>();
