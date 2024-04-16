import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

import { IconName } from "#components/buttons/IconName";
import {
  BaseButtonTheme,
  ThemedButton,
} from "#components/buttons/ThemedButton";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";

type RegistrationNavigationProps = {
  onPressBack: () => void;
  progress: number;
};

export function ProgressHeader({
  onPressBack,
  progress,
}: RegistrationNavigationProps) {
  const styles = useAppThemeStyle(makeStyles);

  const disabled = progress === 0;

  const progressAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnimated, {
      toValue: progress,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = progressAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: ["20%", "100%"],
  });

  return (
    <View style={styles.container}>
      <ThemedButton
        theme={BaseButtonTheme.INLINE}
        onPress={onPressBack}
        icon={IconName.ARROW_LEFT}
        colorName="secondary"
        disabled={disabled}
      />
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressBarAnim, { width }]} />
        </View>
      </View>
      <View style={{ width: 50 }} />
    </View>
  );
}

const makeStyles = (appTheme: AppTheme) =>
  createStyleSheet({
    container: {
      flexDirection: "row",
    },
    backButton: {
      flexDirection: "row",
    },
    progressBarContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    progressBar: {
      width: 130,
      height: 5,
      backgroundColor: "#c4c4c4",
      borderRadius: 100,
    },
    progressBarAnim: {
      height: "100%",
      position: "absolute",
      backgroundColor: appTheme.colors.onSecondaryContainer,
      borderRadius: 100,
    },
  });
