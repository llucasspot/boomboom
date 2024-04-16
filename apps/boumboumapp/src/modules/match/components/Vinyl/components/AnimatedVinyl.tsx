import React, { PropsWithChildren, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import {
  DELAY_ROTATION_VINYL,
  DURATION_ROTATION_VINYL,
} from "../../../constants";

type AnimatedVinylProps = PropsWithChildren<{
  reversed?: boolean;
}>;

export function AnimatedVinyl({ children, reversed }: AnimatedVinylProps) {
  const vinylRotationZ = useSharedValue(!reversed ? "90deg" : "-90deg");

  useEffect(() => {
    vinylRotationZ.value = withDelay(
      DELAY_ROTATION_VINYL,
      withTiming("0deg", { duration: DURATION_ROTATION_VINYL }),
    );
  }, []);

  return (
    <Animated.View
      style={[
        styles.vinylSection,
        {
          transform: [
            { rotate: vinylRotationZ },
            { scaleX: reversed ? -1 : 1 },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  vinylSection: {
    justifyContent: "center",
    alignItems: "center",
    width: 494 / 2,
    height: 494 / 2,
  },
});
