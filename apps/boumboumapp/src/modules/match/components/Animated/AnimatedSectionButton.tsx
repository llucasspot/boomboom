import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { DELAY_APPARITION_BUTTONS } from "../../constants";

import { LueurButton } from "#components/lueurs/LueurButton";
import { BaseText } from "#components/texts/BaseText";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";

const CONTENT_PADDING = 20;

export type AnimatedSectionButtonProps = {
  onClose: () => void;
};

export function AnimatedSectionButton({ onClose }: AnimatedSectionButtonProps) {
  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;

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
      <LueurButton
        content="match.AnimatedSectionButton.contactYourMatch"
        onPress={btnContact}
      />

      <Pressable onPress={onClose}>
        <BaseText
          i18nKey="match.AnimatedSectionButton.orContinueToMatch"
          style={[tagStyles.p, { textDecorationLine: "underline" }]}
        />
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
