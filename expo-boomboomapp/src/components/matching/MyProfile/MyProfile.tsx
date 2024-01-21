import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/core";
import { NavigationProp } from "@react-navigation/core/src/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Image,
  ImageSourcePropType,
  Platform,
  Text,
  View,
} from "react-native";
import * as yup from "yup";

import { ProfileApiService } from "../../../api/ProfileApiService/ProfileApiService";
import useEStyles from "../../../hooks/useEStyles";
import {
  RootStackParamsList,
  RootStackScreen,
} from "../../../navigation/RootStackScreenNavigator/RootStack";
import AuthService from "../../../services/AuthService/AuthService";
import LanguageService from "../../../services/LanguageService/LanguageService";
import { useCoreStyles } from "../../../services/StyleService/styles";
import UserService from "../../../services/UserService/UserService";
import {
  Gender,
  UserStateConnected,
} from "../../../services/UserService/userServiceI";
import ServiceInterface from "../../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../../tsyringe/diUtils";
import { BaseButton } from "../../Buttons/BaseButton";
import { Screen } from "../../navigation/Screen";
import { UserFormData, UserProfileForm } from "../common/UserProfileForm";

const CONTENT_PADDING = 30;

type MyProfileProps = {
  onBack: () => void;
};

// TODO add styles pattern and I18n

export function MyProfile({ onBack }: MyProfileProps) {
  const userService = getGlobalInstance<UserService>(
    ServiceInterface.UserService,
  );
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );
  const authService = getGlobalInstance<AuthService>(
    ServiceInterface.AuthService,
  );

  const profileApiService = getGlobalInstance<ProfileApiService>(
    ServiceInterface.ProfileApiServiceI,
  );

  // @ts-ignore TODO useUser
  const user: UserStateConnected = userService.useUser();

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
  } = useForm<Partial<UserFormData>>({
    // TODO I18n
    // @ts-ignore TODO
    resolver: yupResolver(
      yup.object().shape({
        fullName: yup
          .string()
          .matches(/^[a-zA-Z0-9]*$/, "Full name must be alphanumeric"),
        dateOfBirth: yup.date(),
        gender: yup
          .mixed<Gender>()
          .oneOf(Object.values(Gender) as Gender[], "Invalid gender"),
        description: yup.string().default(""),
      }),
    ),
  });

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
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  function btnReset() {
    onBack();
    navigation.navigate(RootStackScreen.HOME);
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
        <UserProfileForm
          // @ts-ignore TODO UserProfileForm
          control={control}
          errors={errors}
        />
        <BaseButton
          content={I18n.t("screen.MyProfile.saveButton")}
          color="$secondaryColor"
          style={styles.button}
          onPress={handleSubmit(async (data) => {
            await profileApiService.editProfile(data);
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
