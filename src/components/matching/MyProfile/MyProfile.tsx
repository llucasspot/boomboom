import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/core";
import { NavigationProp } from "@react-navigation/core/src/types";
import { pick } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Image, Platform, Text, View } from "react-native";
import { SerializedUser } from "swagger-boomboom-backend/api";
import * as yup from "yup";

import { BaseButton } from "../../Buttons/BaseButton";
import { UserProfileForm } from "../common/UserProfileForm";

import { ProfileApiService } from "#api/ProfileApiService/ProfileApiService";
import { Screen } from "#components/navigation/Screen";
import useEStyles from "#hooks/useEStyles";
import {
  RootStackParamsList,
  RootStackScreen,
} from "#navigation/RootStackScreenNavigator/RootStack";
import LanguageService from "#services/LanguageService/LanguageService";
import RegistrationStateService from "#services/RegistrationStateService/RegistrationState.service";
import { useCoreStyles } from "#services/StyleService/styles";
import { Gender } from "#services/UserService/userServiceI";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { getGlobalInstance } from "#tsyringe/diUtils";
import { buildImageSource } from "#utils/images.utils";

const CONTENT_PADDING = 30;

type MyProfileProps = {
  onBack: () => void;
};

// TODO add styles pattern and I18n

export function MyProfile({ onBack }: MyProfileProps) {
  const registrationStateService = getGlobalInstance<RegistrationStateService>(
    ServiceInterface.RegistrationStateService,
  );
  const registrationState = registrationStateService.useRegistrationState();
  const profileApiService = getGlobalInstance<ProfileApiService>(
    ServiceInterface.ProfileApiServiceI,
  );
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );

  const { data: profile } = profileApiService.useProfile();
  const { mutate: updateProfile } = profileApiService.useUpdateProfile();

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
  } = useForm<Partial<SerializedUser>>({
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
    reset(
      pick(profile, [
        "fullName",
        "dateOfBirth",
        "genderId",
        "preferedGenderId",
        "description",
      ]),
    );
  }, []);

  const I18n = languageService.useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  function btnReset() {
    onBack();
    navigation.navigate(RootStackScreen.HOME);
  }

  // TODO better
  if (!profile) {
    return null;
  }

  function formatDate(date: Date | undefined): string | undefined {
    if (!date) {
      return undefined;
    }
    // Padding function to ensure day and month are always two digits
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    return `${year}-${month}-${day}`;
  }

  return (
    <Screen title={I18n.t("screen.MyProfile.title")} onGoBack={onBack}>
      <View style={{ alignItems: "center", gap: 10 }}>
        <Image
          // TODO not use registrationState
          source={buildImageSource(registrationState?.profilePicture.uri)}
          style={{
            width: 80,
            height: 80,
            objectFit: "cover",
            borderRadius: 16,
          }}
        />
        <Text style={coreStyles.F13}>Hey {profile.name}</Text>
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
            updateProfile({
              ...data,
              dateOfBirth: formatDate(data.dateOfBirth),
            });
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
