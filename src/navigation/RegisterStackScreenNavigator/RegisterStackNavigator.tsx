import { RegisterStack, RegisterStackScreen } from "./RegisterStack";
import { Registration } from "./screens/Registration";
import { SignInSuccessfulScreen } from "./screens/SignInSuccessfulScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";

export function RegisterStackNavigator() {
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
        component={Registration}
      />
      <RegisterStack.Screen
        name={RegisterStackScreen.WELCOME_SCREEN}
        component={WelcomeScreen}
      />
    </RegisterStack.Navigator>
  );
}
