import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import {
  DELAY_ROTATION_TONEARM,
  DURATION_ROTATION_TONEARM,
} from "../../../constants";

import { IMAGES } from "#modules/match/assets/images";

type AnimatedTonearmProps = {
  reversed?: boolean;
};

export function AnimatedTonearm({ reversed }: AnimatedTonearmProps) {
  const tonearmRotationZ = useSharedValue("-45deg");

  useEffect(() => {
    tonearmRotationZ.value = withDelay(
      DELAY_ROTATION_TONEARM,
      withTiming("0deg", { duration: DURATION_ROTATION_TONEARM }),
    );
  }, []);

  return (
    <Animated.View
      style={[
        styles.tonearmSection,
        { transform: [{ rotateZ: "-45deg" }] },
        !reversed
          ? { right: 75, transform: [{ rotateZ: tonearmRotationZ }] }
          : {
              left: 75,
              transform: [{ scaleX: -1 }, { rotateZ: tonearmRotationZ }],
            },
      ]}
    >
      <Image
        source={IMAGES.matching.tonearm}
        style={[{ width: "100%", height: "100%" }]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tonearmSection: {
    position: "absolute",
    width: 344 / 2,
    height: 344 / 2,
    top: -100,
  },
});
