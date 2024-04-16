import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthStackParamsList, AuthStackScreenName } from "./Auth.stack";

import { AuthScreen } from "#modules/auth/screens/AuthScreen";
import { OauthViewScreen } from "#modules/auth/screens/OauthViewScreen";

export const AuthStack = createNativeStackNavigator<AuthStackParamsList>();

export function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={AuthStackScreenName.AUTH_HOME}
    >
      <AuthStack.Screen
        name={AuthStackScreenName.AUTH_HOME}
        component={AuthScreen}
      />
      <AuthStack.Screen
        name={AuthStackScreenName.OAUTH_SCREEN}
        component={OauthViewScreen}
      />
    </AuthStack.Navigator>
  );
}
