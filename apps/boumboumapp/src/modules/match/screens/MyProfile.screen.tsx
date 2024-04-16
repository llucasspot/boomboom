import { useNavigation } from "@react-navigation/core";
import { NavigationProp } from "@react-navigation/core/src/types";
import React, { useEffect } from "react";
import { Button, Image, Platform, View } from "react-native";

import { BaseButton } from "#components/buttons/BaseButton";
import { BaseText } from "#components/texts/BaseText";
import { MeProfileApiServiceI } from "#modules/api/services/ProfileApi/me-profile-api.serviceI";
import { diService } from "#modules/core/di/di-utils";
import { LanguageService } from "#modules/core/language/language.service";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import {
  RootStackParamsList,
  RootStackScreen,
} from "#modules/match/Root.stack";
import { Screen } from "#modules/match/components/Screen/Screen";

const CONTENT_PADDING = 30;

type MyProfileScreenProps = {
  onBack: () => void;
};

// TODO add styles pattern and I18n

export function MyProfileScreen({ onBack }: MyProfileScreenProps) {
  const languageService = diService.getInstance(LanguageService);
  const I18n = languageService.useTranslation();

  // @ts-ignore interface
  const profileApiService = diService.getInstance(MeProfileApiServiceI);
  const { data: userInfo } = profileApiService.useProfile();
  // const { mutate: updateProfile } = profileApiService.useUpdateProfile();

  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;
  const styles = useAppThemeStyle((appTheme) =>
    createStyleSheet({
      button: {
        marginTop: appTheme.spacers.spacer9,
      },
    }),
  );

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm<Partial<SerializedUser>>({
  //   // TODO I18n
  //   // @ts-ignore TODO
  //   resolver: yupResolver(
  //     yup.object().shape({
  //       fullName: yup
  //         .string()
  //         .matches(/^[a-zA-Z0-9]*$/, "Full name must be alphanumeric"),
  //       dateOfBirth: yup.date(),
  //       gender: yup
  //         .mixed<Gender>()
  //         .oneOf(Object.values(Gender) as Gender[], "Invalid gender"),
  //       description: yup.string().default(""),
  //     }),
  //   ),
  // });

  useEffect(() => {
    // reset(
    //   pick(profile, [
    //     "fullName",
    //     "dateOfBirth",
    //     "genderId",
    //     "preferedGenderId",
    //     "description",
    //   ]),
    // );
  }, []);

  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  function btnReset() {
    onBack();
    navigation.navigate(RootStackScreen.HOME);
  }

  // TODO better
  if (!userInfo) {
    return null;
  }

  return (
    <Screen title={I18n.t("screen.MyProfileScreen.title")} onGoBack={onBack}>
      <View style={{ alignItems: "center", gap: 10 }}>
        <Image
          // TODO not use registrationState
          // source={buildImageSource(registrationState?.profilePicture.uri)}
          style={{
            width: 80,
            height: 80,
            objectFit: "cover",
            borderRadius: 16,
          }}
        />
        <BaseText
          i18nKey="match.MyProfileScreen.keyUsername"
          i18nOptions={{
            username: userInfo.data.name,
          }}
          style={tagStyles.F13}
        />
      </View>

      <View style={{ height: 20 }} />

      <View style={{ padding: CONTENT_PADDING }}>
        {/*<UserProfileForm*/}
        {/*  // @ts-ignore TODO UserProfileForm*/}
        {/*  control={control}*/}
        {/*  errors={errors}*/}
        {/*/>*/}
        <BaseButton
          content={<BaseText i18nKey="screen.MyProfileScreen.saveButton" />}
          colorName="onSecondaryContainer"
          style={styles.button}
          // onPress={handleSubmit(async (data) => {
          //   updateProfile({
          //     ...data,
          //     dateOfBirth: formatDate(data.dateOfBirth),
          //   });
          // })}
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
