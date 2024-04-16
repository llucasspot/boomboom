import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import { Image, ImageStyle, TouchableOpacity, View } from "react-native";

import { StepProps } from "../RegisterStepper";

import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";
import { CIRCLE_SIZE } from "#modules/core/style/themes/beans/theme.constants";
import { buildImageSource } from "#modules/core/utils/images.utils";
import btnEdit from "#modules/registration/assets/Registration/btn_edit.png";
import iconUser from "#modules/registration/assets/Registration/icon_user.png";

export function UploadAvatar({
  stepperNavigation,
  setStepperLayoutCallback,
  stateManager,
}: StepProps) {
  const styles = useAppThemeStyle(makeStyles);

  setStepperLayoutCallback(() => {
    // @ts-ignore navigate TODO
    stepperNavigation.navigate(`${stepperNavigation.getState().index + 1}`);
  });

  const registrationState = stateManager.useRegistrationState();
  const avatar = registrationState?.profilePictureUri as string;

  useEffect(() => {
    stateManager.updateStepperState({
      isSubmitDisabled: !registrationState?.profilePictureUri,
    });
  }, [registrationState]);

  async function pick() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      // TODO to see if we keep type & name in state
      stateManager.updateRegistrationState({
        profilePictureUri: image.uri,
      });
    }
  }

  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity onPress={pick} style={styles.circle}>
        <View style={styles.imageContainer}>
          {avatar ? (
            <Image
              source={buildImageSource(avatar)}
              style={styles.image as ImageStyle}
            />
          ) : (
            <Image source={iconUser} style={styles.imageEmpty as ImageStyle} />
          )}
        </View>
        {/*// TODO not use png because color not update*/}
        <Image source={btnEdit} style={styles.image_btn_edit as ImageStyle} />
      </TouchableOpacity>
    </View>
  );
}

const makeStyles = (appTheme: AppTheme) =>
  createStyleSheet({
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    circle: {
      height: CIRCLE_SIZE,
      width: CIRCLE_SIZE,
      backgroundColor: "white",
      borderRadius: 200,
      borderWidth: 2,
      borderStyle: "dotted",
      borderColor: appTheme.colors.primary,
    },
    image_btn_edit: {
      width: 122 / 2,
      height: 122 / 2,
      position: "absolute",
      left: CIRCLE_SIZE / 2 - 122 / 4,
      bottom: -122 / 4,
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    imageEmpty: {
      width: "40%",
      height: "40%",
      objectFit: "cover",
    },
    imageContainer: {
      flex: 1,
      backgroundColor: "#ececec",
      borderRadius: CIRCLE_SIZE,
      margin: 8,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },
  });
