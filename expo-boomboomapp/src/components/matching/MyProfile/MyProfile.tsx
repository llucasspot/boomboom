import { Redirect, router } from "expo-router";
import {
  Button,
  Image,
  ImageSourcePropType,
  Platform,
  Text,
  View,
} from "react-native";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RootStackScreen } from "../../../navigation/RootStackScreenNavigator/RootStack";
import AuthService from "../../../services/AuthService/AuthService";
import LanguageService from "../../../services/LanguageService/LanguageService";
import { useCoreStyles } from "../../../services/StyleService/styles";
import UserService from "../../../services/UserService/UserService";
import { Gender } from "../../../services/UserService/userServiceI";
import ServiceInterface from "../../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../../tsyringe/diUtils";
import { BaseButton } from "../../Buttons/BaseButton";
import { Screen } from "../../navigation/Screen";
import { UserFormProps, UserProfileForm } from "../common/UserProfileForm";
import useEStyles from "../../../hooks/useEStyles";
import { ProfileApiService } from "../../../api/ProfileApiService/ProfileApiService";

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
  const authService = getGlobalInstance<AuthService>(
    ServiceInterface.AuthService
  );

  const profileApiService = getGlobalInstance<ProfileApiService>(
    ServiceInterface.ProfileApiServiceI
  );

  const user = userService.useUser();

  const coreStyles = useCoreStyles();
  const styles = useEStyles({
    button: {
      marginTop: "$spacer9",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormProps>();

  useEffect(() => {
    (async () => {
      try {
        const userInfo = await authService.getUserInfo();
        if (!userInfo.isConnected) {
          reset({
            gender: Gender.NO_SPECIFIC,
          });
          return;
        }
        reset(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    })();
  }, []);

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
        <UserProfileForm inputsIsRequired control={control} errors={errors} />
        <BaseButton
          content={I18n.t("screen.MyProfile.saveButton")}
          color="$secondaryColor"
          style={styles.button}
          onPress={handleSubmit((data) => {
            profileApiService.editProfile(data);
            userService.updateUserState(data);
          })}
        />
      </View>

      <View>
        {Platform.OS !== "android" && (
          <Button title="Debug : Back to home" onPress={btnReset} />
        )}
      </View>
    </Screen>
  );
}
