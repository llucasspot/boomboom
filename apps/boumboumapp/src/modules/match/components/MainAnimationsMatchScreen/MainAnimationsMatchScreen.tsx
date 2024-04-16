import { UserInfo } from "@boumboum/swagger-backend";
import React from "react";
import { StyleSheet, View } from "react-native";

import { buildImageSource } from "#modules/core/utils/images.utils";
import { FloatingIcons } from "#modules/match/components/FloatingIcons/FloatingIcons";
import { AnimatedHeader } from "#modules/match/components/MainAnimationsMatchScreen/components/AnimatedHeader";
import { Vinyl } from "#modules/match/components/Vinyl/Vinyl";
import { useRootStackContext } from "#modules/match/context/RootStack.context";

export type MainAnimationsMatchScreenProps = {
  matchedUser: UserInfo;
};

export function MainAnimationsMatchScreen({
  matchedUser,
}: MainAnimationsMatchScreenProps) {
  const photoMatched = matchedUser.avatarUri;
  const { avatarUri } = useRootStackContext();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AnimatedHeader />
      </View>

      <View style={styles.iconsAnimatedSection}>
        <FloatingIcons />
      </View>

      <View style={styles.vinylsSection}>
        <Vinyl avatar={buildImageSource(avatarUri)} />
        <Vinyl reversed avatar={buildImageSource(photoMatched)} />
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
