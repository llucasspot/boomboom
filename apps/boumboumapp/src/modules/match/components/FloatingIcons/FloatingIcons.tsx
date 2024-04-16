import React, { useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";

import {
  DELAY_START_FIRST_HEART,
  DELAY_START_FIRST_NOTE,
  DELAY_START_SECOND_HEART,
  DELAY_START_SECOND_NOTE,
} from "../../constants";

import { IMAGES } from "#modules/match/assets/images";
import { AnimatedFloatIcon } from "#modules/match/components/FloatingIcons/components/AnimatedFloatIcon";

export function FloatingIcons() {
  const [height, setHeight] = useState(0);

  const getHeightContainer = (e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  };

  return (
    <View onLayout={getHeightContainer} style={styles.container}>
      {height ? (
        <>
          <AnimatedFloatIcon
            height={height}
            image={IMAGES.matching.floating_heart}
            delayStart={DELAY_START_FIRST_HEART}
            yStart={10}
            xStart={-15}
            xEnd={100}
            rotateStart="10deg"
            rotateEnd="10deg"
          />
          <AnimatedFloatIcon
            height={height}
            image={IMAGES.matching.floating_note}
            delayStart={DELAY_START_FIRST_NOTE}
            yStart={25}
            xStart={0}
            xEnd={-100}
            rotateStart="-10deg"
            rotateEnd="-75deg"
          />
          <AnimatedFloatIcon
            height={height}
            image={IMAGES.matching.floating_heart}
            delayStart={DELAY_START_SECOND_HEART}
            yStart={15}
            xStart={-10}
            xEnd={85}
            rotateStart="10deg"
            rotateEnd="-20deg"
          />
          <AnimatedFloatIcon
            height={height}
            image={IMAGES.matching.floating_note}
            delayStart={DELAY_START_SECOND_NOTE}
            yStart={25}
            xStart={15}
            xEnd={-80}
            rotateStart="-10deg"
            rotateEnd="60deg"
          />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    bottom: 0,
    width: 30,
    height: 30,
  },
});
