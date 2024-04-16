import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

import { createTextStyle } from "#modules/core/style/beans/createStyleSheet";
import { AppTheme } from "#modules/core/style/themes/beans/theme";

type TagTextStyleName =
  | "default"
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "buttonText"
  | "buttonIconText"
  | "INPUT_TEXT"
  | "FONT_INPUT"
  | "SONG_CARD"
  | "SONG_CARD_IMAGE"
  | "MATCHING_CARD"
  | "FONT_SONGTITLE"
  | "F13"
  | "F15"
  | "F16";

export const tagTextStyles = (
  appTheme: AppTheme,
): Record<TagTextStyleName, TextStyle> => {
  return {
    default: createTextStyle({
      fontSize: "0.8rem",
    }),
    h1: createTextStyle({
      fontSize: "2rem",
      color: appTheme.colors.onSecondaryContainer,
      fontWeight: "bold",
    }),
    h2: createTextStyle({
      fontSize: "1.5rem",
      color: appTheme.colors.onSecondaryContainer,
    }),
    h3: createTextStyle({
      fontSize: "1rem",
      color: appTheme.colors.onSecondaryContainer,
      fontWeight: "bold",
    }),
    p: createTextStyle({
      fontSize: "0.8rem",
      color: "#808080",
    }),
    buttonText: createTextStyle({
      fontSize: "1rem",
    }),
    buttonIconText: createTextStyle({
      fontSize: "1.2rem",
    }),
    INPUT_TEXT: createTextStyle({
      borderBottomWidth: 1,
      paddingVertical: "0.8rem",
      borderColor: appTheme.colors.onSurfaceVariant,
      fontSize: 12,
      color: appTheme.colors.onSecondaryContainer,
    }),
    FONT_INPUT: createTextStyle({
      fontSize: 13,
      color: appTheme.colors.onSecondaryContainer,
    }),
    SONG_CARD: createTextStyle({
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: appTheme.colors.onSurfaceVariant,
      borderRadius: 16,
      padding: 10,
      shadowColor: "#696969",
      shadowRadius: 20,
      shadowOpacity: 0.1,
      shadowOffset: { height: 0, width: 0 },
      flexDirection: "row",
      alignItems: "center",
      elevation: 10,
    }),
    SONG_CARD_IMAGE: createTextStyle({
      width: 60,
      height: 60,
      borderRadius: 10,
    }),
    MATCHING_CARD: createTextStyle({
      width: "100%",
      backgroundColor: "white",
      borderRadius: 24,
      alignItems: "center",
      gap: 20,
      paddingTop: 20,
      shadowColor: "#b9b9b9",
      shadowRadius: 20,
      shadowOpacity: 0.4,
      shadowOffset: { height: 20, width: 0 },
      elevation: 10,
    }),
    FONT_SONGTITLE: createTextStyle({
      fontSize: 16,
      fontWeight: "bold",
    }),
    F13: {
      fontSize: 13,
      color: appTheme.colors.onSecondaryContainer,
    },
    F15: {
      fontSize: 15,
      color: appTheme.colors.onSecondaryContainer,
    },
    F16: {
      fontSize: 16,
      color: "#000",
    },
  };
};

export const tags = (appTheme: AppTheme) => {
  return {
    ...tagTextStyles(appTheme),
  };
};

type SpacerName =
  | "spacer0"
  | "spacer1"
  | "spacer2"
  | "spacer3"
  | "spacer4"
  | "spacer5"
  | "spacer6"
  | "spacer7"
  | "spacer8"
  | "spacer9";

export const spacers: Record<SpacerName, `${number}rem`> = {
  spacer0: "0.2rem",
  spacer1: "0.4rem",
  spacer2: "0.6rem",
  spacer3: "0.8rem",
  spacer4: "1rem",
  spacer5: "1.33rem",
  spacer6: "1.66rem",
  spacer7: "2rem",
  spacer8: "3rem",
  spacer9: "4rem",
};

export const borderRadius = {
  // core radius
  extraSmallBorderRadius: 10,
  smallBorderRadius: 15, // for buttons
  mediumBorderRadius: 20,
  borderRadius: 25,
  largeBorderRadius: 30,
  // component radius
  roundedBorderRadius: 30,
  circleBorderRadius: 100,
};

export const fontSizes = {
  // core fontSizes
  $h1FontSize: "2rem",
  $h2FontSize: "1.5rem",
  $h3FontSize: "1rem",
  $pFontSize: "0.8rem",
  // component fontSizes
  $buttonFontSize: "1rem",
  $buttonIconFontSize: "1.2rem",
};
