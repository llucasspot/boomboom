import {
  DimensionValue as RMDimensionValue,
  FlexStyle,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { lightPaperTheme } from "#modules/core/style/themes/light.theme";

export type ExtendedNamedStyles<T> = {
  [P in keyof T]: ExtendedViewStyle | ExtendedTextStyle | ImageStyle;
};

type ExtendedNumber = number | `${number}rem`;

type DimensionValue = RMDimensionValue | ExtendedNumber;

interface ExtendedViewStyle extends ExtendedFlexStyle, ViewStyle {
  bottom?: DimensionValue | undefined;
  end?: DimensionValue | undefined;
  flexBasis?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  left?: DimensionValue | undefined;
  margin?: DimensionValue | undefined;
  marginBottom?: DimensionValue | undefined;
  marginEnd?: DimensionValue | undefined;
  marginHorizontal?: DimensionValue | undefined;
  marginLeft?: DimensionValue | undefined;
  marginRight?: DimensionValue | undefined;
  marginStart?: DimensionValue | undefined;
  marginTop?: DimensionValue | undefined;
  marginVertical?: DimensionValue | undefined;
  maxHeight?: DimensionValue | undefined;
  maxWidth?: DimensionValue | undefined;
  minHeight?: DimensionValue | undefined;
  minWidth?: DimensionValue | undefined;
  padding?: DimensionValue | undefined;
  paddingBottom?: DimensionValue | undefined;
  paddingEnd?: DimensionValue | undefined;
  paddingHorizontal?: DimensionValue | undefined;
  paddingLeft?: DimensionValue | undefined;
  paddingRight?: DimensionValue | undefined;
  paddingStart?: DimensionValue | undefined;
  paddingTop?: DimensionValue | undefined;
  paddingVertical?: DimensionValue | undefined;
  right?: DimensionValue | undefined;
  start?: DimensionValue | undefined;
  top?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
}

interface ExtendedTextStyle extends ExtendedViewStyle, TextStyle {
  fontSize?: number | undefined | `${number}rem`;
  letterSpacing?: number | undefined | `${number}rem`;
  lineHeight?: number | undefined | `${number}rem`;
}

interface ExtendedFlexStyle extends FlexStyle {
  aspectRatio?: ExtendedNumber | string | undefined;
  borderBottomWidth?: ExtendedNumber | undefined;
  borderEndWidth?: ExtendedNumber | undefined;
  borderLeftWidth?: ExtendedNumber | undefined;
  borderRightWidth?: ExtendedNumber | undefined;
  borderStartWidth?: ExtendedNumber | undefined;
  borderTopWidth?: ExtendedNumber | undefined;
  borderWidth?: ExtendedNumber | undefined;
  bottom?: DimensionValue | undefined;
  end?: DimensionValue | undefined;
  flex?: ExtendedNumber | undefined;
  flexBasis?: DimensionValue | undefined;
  rowGap?: ExtendedNumber | undefined;
  gap?: ExtendedNumber | undefined;
  columnGap?: ExtendedNumber | undefined;
  flexGrow?: ExtendedNumber | undefined;
  flexShrink?: ExtendedNumber | undefined;
  height?: DimensionValue | undefined;
  left?: DimensionValue | undefined;
  margin?: DimensionValue | undefined;
  marginBottom?: DimensionValue | undefined;
  marginEnd?: DimensionValue | undefined;
  marginHorizontal?: DimensionValue | undefined;
  marginLeft?: DimensionValue | undefined;
  marginRight?: DimensionValue | undefined;
  marginStart?: DimensionValue | undefined;
  marginTop?: DimensionValue | undefined;
  marginVertical?: DimensionValue | undefined;
  maxHeight?: DimensionValue | undefined;
  maxWidth?: DimensionValue | undefined;
  minHeight?: DimensionValue | undefined;
  minWidth?: DimensionValue | undefined;
  padding?: DimensionValue | undefined;
  paddingBottom?: DimensionValue | undefined;
  paddingEnd?: DimensionValue | undefined;
  paddingHorizontal?: DimensionValue | undefined;
  paddingLeft?: DimensionValue | undefined;
  paddingRight?: DimensionValue | undefined;
  paddingStart?: DimensionValue | undefined;
  paddingTop?: DimensionValue | undefined;
  paddingVertical?: DimensionValue | undefined;
  right?: DimensionValue | undefined;
  start?: DimensionValue | undefined;
  top?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
  zIndex?: ExtendedNumber | undefined;
}

export type AppTheme = typeof lightPaperTheme;
