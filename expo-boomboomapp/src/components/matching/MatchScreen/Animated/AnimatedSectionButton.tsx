import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { CustomButton } from "../../common/CustomButton";
import { DELAY_APPARITION_BUTTONS } from "../constants/constants";

import { useCoreStyles } from "#services/StyleService/styles";

const CONTENT_PADDING = 20;

export type AnimatedSectionButtonProps = {
  onClose: () => void;
};

export default function AnimatedSectionButton({
  onClose,
}: AnimatedSectionButtonProps) {
  const coreStyles = useCoreStyles();

  function btnContact() {}

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.85);

  useEffect(() => {
    opacity.value = withDelay(DELAY_APPARITION_BUTTONS, withTiming(1));
    scale.value = withDelay(DELAY_APPARITION_BUTTONS, withTiming(1));
  }, []);

  return (
    <Animated.View
      style={[
        styles.buttonsSection,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <CustomButton title="Contact your match" onPress={btnContact} />

      <Pressable onPress={onClose}>
        <Text style={{ ...coreStyles.P, textDecorationLine: "underline" }}>
          Or continue to match
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonsSection: {
    alignItems: "center",
    padding: CONTENT_PADDING,
    gap: 16,
  },
});
