import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { CardContent } from "./components/CardContent";

import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { ProfileToShow } from "#modules/match/beans";
import { useHomeScreenContext } from "#modules/match/context/HomeScreen.context";

type CardProps = {
  index: number;
  profile: ProfileToShow;
};

export function Card({ profile, index }: CardProps) {
  const { actionObserver } = useHomeScreenContext();

  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;

  const putToFrontAnim = useRef(
    new Animated.Value(index === 0 ? 1 : 0),
  ).current;
  const sendToLeftOrRightAnim = useRef(new Animated.Value(0)).current;

  const scale = putToFrontAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });
  const translateY = putToFrontAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [45, 0],
  });

  const translateX = sendToLeftOrRightAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-1000, 1000],
  });

  const rotate = sendToLeftOrRightAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-45deg", "45deg"],
  });

  const backgroundColor = sendToLeftOrRightAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["white", "white", "pink"],
  });

  useEffect(() => {
    const cb = actionObserver.subscribe(({ action }) => {
      if (index === 0) {
        Animated.timing(sendToLeftOrRightAnim, {
          toValue: action === "like" ? 1 : -1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
      if (index === 1) {
        Animated.timing(putToFrontAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });

    return () => {
      actionObserver.unsubscribe(cb);
    };
  }, [index]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        zIndex: 1000 - index,
        ...tagStyles.MATCHING_CARD,
        transform: [{ scale }, { translateY }, { translateX }, { rotate }],
        backgroundColor,
      }}
    >
      <CardContent profile={profile} />
    </Animated.View>
  );
}
