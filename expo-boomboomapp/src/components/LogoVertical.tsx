import boomboomLogo from "@assets/logo.png";
import boomboomLogoText from "@assets/logo_text.svg";
import React from "react";
import { Image, ImageStyle, View } from "react-native";
import { SvgXml } from "react-native-svg";

import useEStyles from "../hooks/useEStyles";

export const LogoVertical = (): JSX.Element => {
  const styles = useEStyles({
    logoContainer: {
      alignItems: "center",
      height: "4rem",
    },
    logoImageText: {
      width: "2rem",
      height: "2rem",
    },
  });

  return (
    <View style={styles.logoContainer}>
      <Image style={styles.logoImageText as ImageStyle} source={boomboomLogo} />
      <SvgXml width="40%" height="100%" xml={boomboomLogoText} />
    </View>
  );
};
