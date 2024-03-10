import { AuthStack, AuthStackScreenName } from "./AuthStack";
import { AuthScreen } from "./screens/AuthScreen";
import { OauthViewScreen } from "./screens/OauthViewScreen";

export function AuthStackNavigator() {
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
