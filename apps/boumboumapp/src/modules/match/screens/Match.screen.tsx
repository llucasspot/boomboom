import React, { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

import { AnimatedSectionButton } from "#modules/match/components/Animated/AnimatedSectionButton";
import { BlurredAura } from "#modules/match/components/BlurredAura";
import { MainAnimationsMatchScreen } from "#modules/match/components/MainAnimationsMatchScreen/MainAnimationsMatchScreen";

export type MatchScreenProps = {
  onClose: () => void;
} & ComponentProps<typeof MainAnimationsMatchScreen>;

export function MatchScreen({ matchedUser, onClose }: MatchScreenProps) {
  return (
    <View style={styles.container}>
      <BlurredAura color="red" position="bottom-right" />
      <BlurredAura color="blue" position="top-left" />

      <View style={styles.matchAnimationSection}>
        <MainAnimationsMatchScreen matchedUser={matchedUser} />
      </View>

      <AnimatedSectionButton onClose={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  topScreen: {},
  matchAnimationSection: {
    flex: 1,
  },
});
