import React, { PropsWithChildren, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import {
  DELAY_START_VINYL,
  DURATION_TRANSLATION_COMPONENT,
} from "../../../constants";

const WIDTH = Dimensions.get("window").width / 2;

type AnimatedContainerProps = PropsWithChildren<{
  reversed?: boolean;
}>;

export function AnimatedContainer({
  children,
  reversed,
}: AnimatedContainerProps) {
  const containerTranslateX = useSharedValue(!reversed ? -WIDTH : WIDTH);

  useEffect(() => {
    containerTranslateX.value = withDelay(
      DELAY_START_VINYL,
      withTiming(0, { duration: DURATION_TRANSLATION_COMPONENT }),
    );
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: containerTranslateX }] },
        !reversed && { alignItems: "flex-end" },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
