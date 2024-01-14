import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  TouchableOpacity,
  View,
} from "react-native";

import btnEdit from "../../assets/Registration/btn_edit.png";
import iconUser from "../../assets/Registration/icon_user.png";
import { StepProps } from "../../components/ScreenStepperLayout";
import useEStyles from "../../hooks/useEStyles";
import UserService from "../../services/UserService/UserService";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../tsyringe/diUtils";
import {UserStateConnected} from "../../services/UserService/userServiceI";

const CIRCLE_SIZE = 200;

export default function UploadAvatar({ setStepperLayoutCallback }: StepProps) {
  const userService = getGlobalInstance<UserService>(
    ServiceInterface.UserService,
  );

  setStepperLayoutCallback(({navigateOnNextStep}) => {
    navigateOnNextStep()
  });

  // @ts-ignore TODO useUser
  const user: UserStateConnected = userService.useUser()
  const image = user.profilePicture.uri as string

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
      userService.updateUserState({
        profilePicture: {
          uri: image.uri as ImageSourcePropType,
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
          {image && (
            <Image source={{ uri: image }} style={styles.image as ImageStyle} />
          )}
          {!image && (
            <Image source={iconUser} style={styles.imageEmpty as ImageStyle} />
          )}
        </View>
        {/*// TODO not use png because color not update*/}
        <Image source={btnEdit} style={styles.image_btn_edit as ImageStyle} />
      </TouchableOpacity>
    </View>
  );
}
