import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RegisterStackParamsList, RegisterStackScreen } from "./Register.stack";

import { RegistrationScreen } from "#modules/registration/screens/Registration.screen";
import { SignInSuccessfulScreen } from "#modules/registration/screens/SignInSuccessful.screen";
import { WelcomeScreen } from "#modules/registration/screens/Welcome.screen";

const RegisterStack = createNativeStackNavigator<RegisterStackParamsList>();

export function RegisterNavigator() {
  return (
    <RegisterStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RegisterStackScreen.LOGIN_SUCCESSFUL}
    >
      <RegisterStack.Screen
        name={RegisterStackScreen.LOGIN_SUCCESSFUL}
        component={SignInSuccessfulScreen}
      />
      <RegisterStack.Screen
        name={RegisterStackScreen.REGISTRATION_SCREEN}
        component={RegistrationScreen}
      />
      <RegisterStack.Screen
        name={RegisterStackScreen.WELCOME_SCREEN}
        component={WelcomeScreen}
      />
    </RegisterStack.Navigator>
  );
}
