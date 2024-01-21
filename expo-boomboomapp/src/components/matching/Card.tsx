import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { CardContent } from "./CardContent";
import { Observer } from "./hooks/useObserver";
import { StackProfileI } from "../../api/ProfileApiService/ProfileApiServiceI";
import { useCoreStyles } from "../../services/StyleService/styles";

type CardProps = {
  index: number;
  profile: StackProfileI;
  onNext: Observer;
  setCurrentIdBackground: React.Dispatch<React.SetStateAction<string | null>>;
};

// TODO add styles pattern and I18n

export function Card({
  profile,
  onNext,
  index,
  setCurrentIdBackground,
}: CardProps) {
  const coreStyle = useCoreStyles();

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
    const cb = onNext.current.subscribe((isYes: boolean) => {
      if (index === 0) {
        Animated.timing(sendToLeftOrRightAnim, {
          toValue: isYes ? 1 : -1,
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
      onNext.current.unsubscribe(cb);
    };
  }, [index]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        zIndex: 1000 - index,
        ...coreStyle.MATCHING_CARD,
        transform: [{ scale }, { translateY }, { translateX }, { rotate }],
        backgroundColor,
      }}
    >
      <CardContent
        profile={profile}
        setCurrentIdBackground={setCurrentIdBackground}
      />
    </Animated.View>
  );
}
