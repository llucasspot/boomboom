import React from "react";
import { StyleSheet, View } from "react-native";

import ServiceInterface from "./../../../tsyringe/ServiceInterface";
import AnimatedHeader from "./Animated/AnimatedHeader";
import FloatingIcons from "./FloatingIcons";
import Vinyl from "./Vinyl";
import UserService from "../../../services/UserService/UserService";
import { UserStateConnected } from "../../../services/UserService/userServiceI";
import { getGlobalInstance } from "../../../tsyringe/diUtils";

export type MainAnimationsMatchScreenProps = {
  matchedUser: { image: string };
};

export default function MainAnimationsMatchScreen({
  matchedUser,
}: MainAnimationsMatchScreenProps) {
  const userService = getGlobalInstance<UserService>(
    ServiceInterface.UserService,
  );
  // @ts-ignore TODO useUser
  const user: UserStateConnected = userService.useUser();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AnimatedHeader />
      </View>

      <View style={styles.iconsAnimatedSection}>
        <FloatingIcons />
      </View>

      <View style={styles.vinylsSection}>
        <Vinyl avatar={user.profilePicture.uri} />
        <Vinyl reversed avatar={matchedUser.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    alignSelf: "center",
    top: 100,
  },
  iconsAnimatedSection: {
    flex: 1,
  },
  vinylsSection: {
    flexDirection: "row",
    gap: 5,
  },
});
