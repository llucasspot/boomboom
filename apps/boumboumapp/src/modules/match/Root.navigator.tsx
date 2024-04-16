import { UserInfoData } from "@boumboum/swagger-backend";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamsList, RootStackScreen } from "./Root.stack";
import { HomeScreen } from "./screens/Home.screen";

import { MeProfileApiService } from "#modules/api/services/ProfileApi/me-profile-api.service";
import { diService } from "#modules/core/di/di-utils";
import { RootStackContextProvider } from "#modules/match/context/RootStack.context";

export const RootStack = createNativeStackNavigator<RootStackParamsList>();

type RootStackNavigatorProps = {
  userInfo: UserInfoData;
};

export function RootNavigator({ userInfo }: RootStackNavigatorProps) {
  const meProfileApiService = diService.getInstance(MeProfileApiService);
  const { data: avatarUri } = meProfileApiService.useAvatar();
  return (
    <RootStackContextProvider contextData={{ userInfo, avatarUri }}>
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={RootStackScreen.HOME}
      >
        <RootStack.Screen name={RootStackScreen.HOME} component={HomeScreen} />
      </RootStack.Navigator>
    </RootStackContextProvider>
  );
}
