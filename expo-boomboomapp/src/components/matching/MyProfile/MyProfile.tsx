import { Redirect, router } from "expo-router";
import {
  Button,
  Image,
  ImageSourcePropType,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackScreen } from "../../../navigation/RootStackScreenNavigator/RootStack";
import { useCoreStyles } from "../../../services/StyleService/styles";
import UserService from "../../../services/UserService/UserService";
import ServiceInterface from "../../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../../tsyringe/diUtils";
import { ProfileForm } from "../common/ProfileForm";

const CONTENT_PADDING = 30;

type MyProfileProps = {
  onBack: () => void;
};

// TODO add styles pattern and I18n

export function MyProfile({ onBack }: MyProfileProps) {
  const userService = getGlobalInstance<UserService>(
    ServiceInterface.UserService,
  );
  const user = userService.useUser();
  const coreStyles = useCoreStyles();

  if (!user.isConnected) {
    return <Redirect href={`/${RootStackScreen.AUTH_HOME}`} />;
  }

  function btnReset() {
    onBack();
    router.push(`/${RootStackScreen.HOME}`);
  }

  return (
    <SafeAreaView style={{}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: CONTENT_PADDING,
        }}
      >
        <Text style={coreStyles.H3}>Profile</Text>
        <TouchableOpacity onPress={onBack}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />

      <View style={{ alignItems: "center", gap: 10 }}>
        <Image
          source={user.profilePicture.uri as ImageSourcePropType}
          style={{
            width: 80,
            height: 80,
            objectFit: "cover",
            borderRadius: 16,
          }}
        />
        <Text style={coreStyles.F13}>Hey {user.fullName}</Text>
      </View>

      <View style={{ height: 20 }} />

      <View style={{ padding: CONTENT_PADDING }}>
        <ProfileForm />
      </View>

      <View>
        {Platform.OS !== "android" && (
          <Button title="Debug : Back to home" onPress={btnReset} />
        )}
      </View>
    </SafeAreaView>
  );
}
