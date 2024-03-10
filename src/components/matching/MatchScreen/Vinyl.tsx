import React from "react";
import { Image, ImageSourcePropType } from "react-native";

import AnimatedAvatar from "./Animated/AnimatedAvatar";
import AnimatedContainer from "./Animated/AnimatedContainer";
import AnimatedTonearm from "./Animated/AnimatedTonearm";
import AnimatedVinyl from "./Animated/AnimatedVinyl";

import { IMAGES } from "#assets/assets";

type VinylProps = {
  avatar: ImageSourcePropType;
  reversed?: boolean;
};

export default function Vinyl({ reversed = false, avatar }: VinylProps) {
  return (
    <AnimatedContainer reversed={reversed}>
      <AnimatedVinyl reversed={reversed}>
        <Image
          source={IMAGES.matching.vinyl}
          style={{ width: "100%", height: "100%" }}
        />

        <AnimatedAvatar avatar={avatar} reversed={reversed} />
      </AnimatedVinyl>

      <AnimatedTonearm reversed={reversed} />
    </AnimatedContainer>
  );
}
