import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

import { BaseButton } from "./Buttons/BaseButton";
import { IconName } from "./Icons/IconName";
import useEStyles from "../hooks/useEStyles";

type RegistrationNavigationProps = {
  onPressBack: () => void;
  progress: number;
};

export function Progressheader({
  onPressBack,
  progress,
}: RegistrationNavigationProps) {
  const disabled = progress === 0;

  const progressAnimated = useRef(new Animated.Value(0)).current;

  const styles = useEStyles({
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
      backgroundColor: "$secondaryColor",
      borderRadius: 100,
    },
  });

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
      <BaseButton
        onPress={onPressBack}
        icon={IconName.ARROW_LEFT}
        color="$backgroundColor"
        textStyle={{
          color: "$grey",
        }}
        disabled={disabled}
      />
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={{ width, ...styles.progressBarAnim }} />
        </View>
      </View>
      <View style={{ width: 50 }} />
    </View>
  );
}
