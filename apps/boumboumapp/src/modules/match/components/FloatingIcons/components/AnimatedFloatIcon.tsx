import React, { useEffect } from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import {
  DELAY_BEFORE_REAPPARITION_FLOAT_ICON,
  DELAY_OUT_FLOAT_ICON,
  DURATION_APPARITION_ICON,
  DURATION_FLOAT_ICON,
  START_POSITION_Y_FLOAT_ICON,
} from "../../../constants";

type AnimatedFloatIconProps = {
  height: number;
  image: ImageSourcePropType;
  delayStart: number;
  xStart: number;
  xEnd: number;
  yStart: number;
  rotateStart: string;
  rotateEnd: string;
};

export function AnimatedFloatIcon({
  height,
  image,
  delayStart,
  xStart,
  xEnd,
  yStart,
  rotateStart,
  rotateEnd,
}: AnimatedFloatIconProps) {
  const yStartPosition = yStart + START_POSITION_Y_FLOAT_ICON;
  const yEndPosition = -(height + 75);

  const translateY = useSharedValue(yStartPosition);
  const translateX = useSharedValue(xStart);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(rotateStart);

  useEffect(() => {
    if (!height) return;

    translateY.value = withDelay(
      delayStart,
      withRepeat(
        withSequence(
          withTiming(yEndPosition, { duration: DURATION_FLOAT_ICON }),
          withDelay(
            DELAY_OUT_FLOAT_ICON,
            withTiming(yStartPosition, { duration: 0 }),
          ),
        ),
        -1,
      ),
    );

    translateX.value = withDelay(
      delayStart,
      withRepeat(
        withSequence(
          withTiming(xEnd, { duration: DURATION_FLOAT_ICON }),
          withDelay(DELAY_OUT_FLOAT_ICON, withTiming(xStart, { duration: 0 })),
        ),
        -1,
      ),
    );

    opacity.value = withDelay(
      delayStart,
      withRepeat(
        withSequence(
          withTiming(1, { duration: DURATION_APPARITION_ICON }),
          withDelay(
            DELAY_BEFORE_REAPPARITION_FLOAT_ICON,
            withTiming(0, { duration: 0 }),
          ),
        ),
        -1,
      ),
    );

    scale.value = withDelay(
      delayStart,
      withRepeat(
        withSequence(
          withTiming(3, { duration: DURATION_FLOAT_ICON }),
          withDelay(
            DELAY_OUT_FLOAT_ICON,
            withTiming(1, { duration: 0, easing: Easing.inOut(Easing.linear) }),
          ),
        ),
        -1,
      ),
    );

    rotateZ.value = withDelay(
      delayStart,
      withRepeat(
        withSequence(
          withTiming(rotateEnd, { duration: DURATION_FLOAT_ICON }),
          withDelay(
            DELAY_OUT_FLOAT_ICON,
            withTiming(xStart, { duration: 0 }),
          ).toString(),
        ),
        -1,
      ),
    ).toString();
  }, [height]);

  return (
    <>
      <Animated.Image
        resizeMode="contain"
        source={image}
        style={[
          styles.icon,
          {
            transform: [{ translateY }, { translateX }, { scale }, { rotateZ }],
            opacity,
          },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    bottom: 0,
    width: 20,
    height: 20,
  },
});
