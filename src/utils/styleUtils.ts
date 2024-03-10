import { StyleProp, StyleSheet } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import NamedStyles = StyleSheet.NamedStyles;

type StyleSheetCreateFunction = <T>(
  styles: T | NamedStyles<T>,
) => NamedStyles<T>;

export const createEStyleSheet: StyleSheetCreateFunction = <T>(
  style: T | NamedStyles<T>,
) => {
  // @ts-ignore exception EStyleSheet
  return StyleSheet.create(EStyleSheet.create(style)) as NamedStyles<T>;
};

export const getEStyleSheetValue = <T>(variable: string): T => {
  return EStyleSheet.value(variable) as T;
};

export const styleSheetCompose = <T>(
  style: StyleProp<T>,
  ...styles: StyleProp<T>[]
): T => {
  if (styles.length === 1) {
    // @ts-ignore
    return { ...style, ...styles[0] };
  }
  const [style2, ...otherStyles] = styles;
  // @ts-ignore
  return styleSheetCompose({ ...style, ...style2 }, ...otherStyles);
};
