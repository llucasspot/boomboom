import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import { Image, ImageStyle, TouchableOpacity, View } from "react-native";

import { StepProps } from "../RegisterStepper";

import btnEdit from "#assets/Registration/btn_edit.png";
import iconUser from "#assets/Registration/icon_user.png";
import useEStyles from "#hooks/useEStyles";
import { RegisterStackParamsList } from "#navigation/RegisterStackScreenNavigator/RegisterStack";
import RegistrationStateService from "#services/RegistrationStateService/RegistrationState.service";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { getGlobalInstance } from "#tsyringe/diUtils";
import { buildImageSource } from "#utils/images.utils";

const CIRCLE_SIZE = 200;

export default function UploadAvatar({
  setStepperLayoutCallback,
  setDisableSubmit,
}: StepProps<RegisterStackParamsList>) {
  const registrationStateService = getGlobalInstance<RegistrationStateService>(
    ServiceInterface.RegistrationStateService,
  );

  setStepperLayoutCallback(({ navigateOnNextStep }) => {
    navigateOnNextStep();
  });

  const registrationState = registrationStateService.useRegistrationState();
  const avatar = registrationState?.profilePicture?.uri as string;

  useEffect(() => {
    setDisableSubmit(!registrationState?.profilePicture?.uri);
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
      registrationStateService.updateRegistrationState({
        profilePicture: {
          uri: image.uri,
          type: image.type ?? "image",
          name: image.fileName ?? "",
        },
      });
    }
  }

  const styles = useEStyles({
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
      borderColor: "$primaryColor",
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
