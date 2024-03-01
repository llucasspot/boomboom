import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { AuthImage } from "../../../Images/AuthImage";
import {
  DELAY_ROTATION_AVATAR,
  DURATION_FULL_ROTATION_AVATAR,
} from "../constants/constants";

type AnimatedAvatarProps = {
  avatar: string;
  reversed?: boolean;
};

export default function AnimatedAvatar({
  avatar,
  reversed,
}: AnimatedAvatarProps) {
  const avatarRotationZ = useSharedValue("0deg");

  useEffect(() => {
    avatarRotationZ.value = withDelay(
      DELAY_ROTATION_AVATAR,
      withRepeat(
        withTiming("360deg", {
          duration: DURATION_FULL_ROTATION_AVATAR,
          easing: Easing.inOut(Easing.linear),
        }),
        -1,
      ),
    );
  }, []);

  return (
    <Animated.View
      style={[
        styles.avatarSection,
        {
          transform: [
            { rotateZ: avatarRotationZ },
            { scaleX: reversed ? -1 : 1 },
          ],
        },
      ]}
    >
      <AuthImage
        uri={avatar}
        style={{ width: "100%", height: "100%", borderRadius: 100 }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  avatarSection: {
    position: "absolute",
    width: 75,
    aspectRatio: 1,
  },
});
