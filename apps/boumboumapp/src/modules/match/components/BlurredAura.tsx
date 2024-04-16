import { Image, View } from "react-native";

import { IMAGES } from "#modules/match/assets/images";

type BlurredAuraProps = {
  color: "red" | "blue";
  position: "top-left" | "bottom-right";
};

// TODO add styles pattern and I18n

export function BlurredAura({ color, position }: BlurredAuraProps) {
  const image =
    color === "blue"
      ? IMAGES.commons.blur_1024_blue
      : IMAGES.commons.blur_1024_red;

  let stylePosition = {};

  if (position === "top-left") {
    stylePosition = {
      top: 0,
      left: 0,
    };
  }
  if (position === "bottom-right") {
    stylePosition = {
      bottom: 0,
      right: 0,
    };
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "absolute",
      }}
    >
      <Image
        source={image}
        style={{
          width: 1024,
          height: 1024,
          ...stylePosition,
          position: "absolute",
        }}
      />
    </View>
  );
}
