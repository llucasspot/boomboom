import React from "react";
import { Image, ImageStyle, View } from "react-native";
import { SvgXml } from "react-native-svg";

import boumboumLogo from "#components/logos/assets/logo.png";
import boumboumLogoText from "#components/logos/assets/logo_text.svg";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";

export const LogoVertical = (): JSX.Element => {
  const styles = createStyleSheet({
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
      <Image style={styles.logoImageText as ImageStyle} source={boumboumLogo} />
      <SvgXml width="40%" height="100%" xml={boumboumLogoText} />
    </View>
  );
};
