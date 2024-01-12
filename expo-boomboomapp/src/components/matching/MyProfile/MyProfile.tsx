import { Redirect, router } from "expo-router";
import {
  Button,
  Image,
  ImageSourcePropType,
  Platform,
  Text,
  View,
} from "react-native";

import { RootStackScreen } from "../../../navigation/RootStackScreenNavigator/RootStack";
import { useCoreStyles } from "../../../services/StyleService/styles";
import UserService from "../../../services/UserService/UserService";
import ServiceInterface from "../../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../../tsyringe/diUtils";
import { ProfileForm } from "../common/ProfileForm";
import { Screen } from "../../navigation/Screen";
import LanguageService from "../../../services/LanguageService/LanguageService";

const CONTENT_PADDING = 30;

type MyProfileProps = {
  onBack: () => void;
};

// TODO add styles pattern and I18n

export function MyProfile({ onBack }: MyProfileProps) {
  const userService = getGlobalInstance<UserService>(
    ServiceInterface.UserService
  );
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI
  );

  const user = userService.useUser();
  const coreStyles = useCoreStyles();

  const I18n = languageService.useTranslation();

  if (!user.isConnected) {
    return <Redirect href={`/${RootStackScreen.AUTH_HOME}`} />;
  }

  function btnReset() {
    onBack();
    router.push(`/${RootStackScreen.HOME}`);
  }

  return (
    <Screen title={I18n.t("screen.MyProfile.title")} onGoBack={onBack}>
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
    </Screen>
  );
}
