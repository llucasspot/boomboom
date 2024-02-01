import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { IMAGES } from "../../../../../assets/assets";
import { useCoreStyles } from "../../../../services/StyleService/styles";
import {
  DELAY_APPARITION_TEXT_HEADER,
  DELAY_START_HEADER,
  DURATION_APPARITION_HEADER,
} from "../constants/constants";

export default function AnimatedHeader() {
  const coreStyles = useCoreStyles();

  const opacityImage = useSharedValue(0);
  const scaleImage = useSharedValue(0.7);
  const opacityText = useSharedValue(0);
  const scaleText = useSharedValue(0.7);

  useEffect(() => {
    opacityImage.value = withDelay(
      DELAY_START_HEADER,
      withTiming(1, {
        duration: DURATION_APPARITION_HEADER,
        easing: Easing.inOut(Easing.linear),
      }),
    );

    scaleImage.value = withDelay(
      DELAY_START_HEADER,
      withSequence(
        withTiming(1, {
          duration: DURATION_APPARITION_HEADER,
          easing: Easing.inOut(Easing.linear),
        }),
        withRepeat(
          withSequence(
            withDelay(
              400,
              withTiming(1.1, {
                duration: 100,
                easing: Easing.inOut(Easing.linear),
              }),
            ),
            withTiming(1.07, {
              duration: 100,
              easing: Easing.inOut(Easing.linear),
            }),
            withTiming(1.1, {
              duration: 100,
              easing: Easing.inOut(Easing.linear),
            }),
            withTiming(1.07, {
              duration: 200,
              easing: Easing.inOut(Easing.linear),
            }),
            withTiming(1, {
              duration: 100,
              easing: Easing.inOut(Easing.linear),
            }),
            withTiming(1.02, {
              duration: 100,
              easing: Easing.inOut(Easing.linear),
            }),
            withTiming(1, {
              duration: 100,
              easing: Easing.inOut(Easing.linear),
            }),
          ),
          -1,
        ),
      ),
    );

    opacityText.value = withDelay(
      DELAY_APPARITION_TEXT_HEADER,
      withTiming(1, {
        duration: DURATION_APPARITION_HEADER,
        easing: Easing.inOut(Easing.linear),
      }),
    );
    scaleText.value = withDelay(
      DELAY_APPARITION_TEXT_HEADER,
      withTiming(1, {
        duration: DURATION_APPARITION_HEADER,
        easing: Easing.inOut(Easing.linear),
      }),
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logo,
          {
            opacity: opacityImage,
            transform: [{ scale: scaleImage }],
          },
        ]}
      >
        <Image
          resizeMode="contain"
          source={IMAGES.logos.logo_3}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>

      <Animated.View
        style={{
          alignItems: "center",
          opacity: opacityText,
          transform: [{ scale: scaleText }],
        }}
      >
        <Text style={coreStyles.H2}>Your hearts in tunes</Text>
        <Text style={coreStyles.P}>Boum Boum, it's a match!</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 156 / 2,
    height: 156 / 2,
  },
});
