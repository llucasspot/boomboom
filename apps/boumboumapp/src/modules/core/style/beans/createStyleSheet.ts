import { Dimensions, PixelRatio, StatusBar, StyleSheet } from "react-native";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { TextProps } from "react-native/Libraries/Text/Text";

import NamedStyles = StyleSheet.NamedStyles;
import {
  ExtendedNamedStyles,
  ExtendedTextStyle,
} from "#modules/core/style/themes/beans/theme";

const baseFontSize = calculateBaseFontSize();

function calculateBaseFontSize() {
  const { width, height } = Dimensions.get("window");
  const statusBarHeight = StatusBar.currentHeight ?? 0;
  const screenHeight = height - statusBarHeight;
  if (width >= 768 || screenHeight >= 768) {
    return 18;
  }
  if (width >= 414 || screenHeight >= 414) {
    return 17;
  }
  return 16;
}

const remNumberToPx = (rem: number) => {
  return rem * baseFontSize * PixelRatio.getFontScale();
};

export const createStyleSheet = <
  T extends ExtendedNamedStyles<T> | ExtendedNamedStyles<any>,
>(
  styles: T | ExtendedNamedStyles<T>,
): NamedStyles<T> => {
  const transformedStyles = {} as NamedStyles<T>;
  for (const key in styles) {
    if (styles.hasOwnProperty(key)) {
      const style = styles[key];
      if (typeof style === "object") {
        // @ts-ignore exception createStyleSheet
        transformedStyles[key] = createStyleSheet(style);
      } else if (typeof style === "string") {
        // @ts-ignore exception createStyleSheet
        transformedStyles[key] = remStringToPx(style);
      } else {
        transformedStyles[key] = style;
      }
    }
  }
  return StyleSheet.create(transformedStyles);
};

export function remStringToPx(str: string): number | string {
  const match = str.match(/^(\d+(\.\d+)?)([a-zA-Z]+)$/);
  if (match) {
    const numericPart = parseFloat(match[1]);
    const unitPart = match[3];
    if (unitPart === "rem" && !isNaN(numericPart)) {
      return remNumberToPx(numericPart);
    }
  }
  return str;
}

export const createTextStyle = <T extends ExtendedTextStyle>(
  style: T,
): TextStyle => {
  const transformedStyles: TextProps["style"] = {};
  for (const key in style) {
    const value = style[key];
    if (isRemString(value)) {
      // @ts-ignore
      transformedStyles[key] = remStringToPx2(value);
    } else {
      // @ts-ignore
      transformedStyles[key] = value;
    }
  }
  return transformedStyles;
};

export function remStringToPx2(str: `${number}rem`): number {
  return remNumberToPx(parseFloat(str.slice(0, str.indexOf("rem"))));
}

const REM_REGEX = /^\d+(\.\d+)?rem$/;

function isRemString(str: any): str is `${number}rem` {
  if (typeof str !== "string") {
    return false;
  }
  return REM_REGEX.test(str);
}
