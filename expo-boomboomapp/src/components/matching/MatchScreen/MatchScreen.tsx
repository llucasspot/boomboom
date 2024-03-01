import React from "react";
import { StyleSheet, View } from "react-native";

import AnimatedSectionButton from "./Animated/AnimatedSectionButton";
import MainAnimationsMatchScreen from "./MainAnimationsMatchScreen";
import { BlurredAura } from "../BlurredAura";

export type MatchScreenProps = {
  onClose: () => void;
  matchedUser: { image: string };
};

export default function MatchScreen({
  matchedUser,
  onClose,
}: MatchScreenProps) {
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
