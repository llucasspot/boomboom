import { StyleState } from "./StyleStateServiceI";

export const colors = (styleState: StyleState) => {
  return {
    // themed colors
    $backgroundColor: styleState.backgroundColor,
    $fontColor: styleState.fontColor,
    $primaryColor: styleState.primaryColor,
    $onPrimaryColor: styleState.onPrimaryColor,
    $secondaryColor: styleState.secondaryColor,
    $onSecondaryColor: styleState.onSecondaryColor,
    $successColor: styleState.successColor,
    $errorColor: styleState.errorColor,
    // colors
    $grayPlaceholderColor: "rgba(120,120,120, 1)",
    $white: "#FFFFFF",
    $black: "#000000",
    $grey: "#6c757d",
    $lightGray: "#8287A1",
    // component colors
    $borderColor: "#dedede",
  };
};

export const borderRadius = {
  // core radius
  $extraSmallBorderRadius: 10,
  $smallBorderRadius: 15, // for buttons
  $mediumBorderRadius: 20,
  $borderRadius: 25,
  $largeBorderRadius: 30,
  // component radius
  $roundedBorderRadius: 30,
  $circleBorderRadius: 100,
};

export const spacers = {
  // core spacers
  $spacer0: "0.2rem",
  $spacer1: "0.4rem",
  $spacer2: "0.6rem",
  $spacer3: "0.8rem",
  $spacer4: "1rem",
  $spacer5: "1.33rem",
  $spacer6: "1.66rem",
  $spacer7: "2rem",
  $spacer8: "3rem",
  $spacer9: "4rem",
  // component spacers
};

export const fontWeights = {
  $lightFontWeight: "300",
  $normalTextFontWeight: "400",
  $subtitleFontWeight: "600",
  $titleFontWeight: "900",
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

export const elevations = {
  $defaultElevation: 64,
};
