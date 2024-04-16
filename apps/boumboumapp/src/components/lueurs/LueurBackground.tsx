import { Image, ImageStyle, View } from "react-native";

import redLueur from "./assets/blur_1024_red.png";

const commonStyle: ImageStyle = {
  width: 1024,
  height: 1024,
  position: "absolute",
};

function RedLueur({ style }: { style: ImageStyle }) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "absolute",
      }}
    >
      <Image source={redLueur} style={[commonStyle, style]} />
    </View>
  );
}

export function LueurBackground() {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "absolute",
      }}
    >
      <RedLueur
        style={{
          bottom: 0,
          right: 0,
        }}
      />
      <RedLueur
        style={{
          top: 0,
          left: 0,
        }}
      />
    </View>
  );
}
