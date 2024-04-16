import React from "react";
import { Image, ImageSourcePropType } from "react-native";

import { IMAGES } from "#modules/match/assets/images";
import { AnimatedAvatar } from "#modules/match/components/Vinyl/components/AnimatedAvatar";
import { AnimatedContainer } from "#modules/match/components/Vinyl/components/AnimatedContainer";
import { AnimatedTonearm } from "#modules/match/components/Vinyl/components/AnimatedTonearm";
import { AnimatedVinyl } from "#modules/match/components/Vinyl/components/AnimatedVinyl";

type VinylProps = {
  avatar: ImageSourcePropType;
  reversed?: boolean;
};

export function Vinyl({ reversed = false, avatar }: VinylProps) {
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
