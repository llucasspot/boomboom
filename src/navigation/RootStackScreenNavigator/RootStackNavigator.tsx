import { RootStack, RootStackScreen } from "./RootStack";
import { HomeScreen } from "./screens/HomeScreen";

export function RootStackNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RootStackScreen.HOME}
    >
      <RootStack.Screen name={RootStackScreen.HOME} component={HomeScreen} />
    </RootStack.Navigator>
  );
}
