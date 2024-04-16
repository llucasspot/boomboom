import React from "react";
import { Image, ImageStyle, View } from "react-native";
import { SvgXml } from "react-native-svg";

import boumboumLogo from "#components/logos/assets/logo.png";
import boumboumLogoText from "#components/logos/assets/logo_text.svg";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";

export const Logo = (): JSX.Element => {
  const styles = useAppThemeStyle(makeStyles);

  return (
    <View style={styles.logoContainer}>
      <Image style={styles.logoImageText as ImageStyle} source={boumboumLogo} />
      <SvgXml width="40%" height="100%" xml={boumboumLogoText} />
    </View>
  );
};

const makeStyles = (appTheme: AppTheme) =>
  createStyleSheet({
    logoContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    logoImageText: {
      width: "3rem",
      height: "3rem",
      marginRight: appTheme.spacers.spacer4,
    },
  });
