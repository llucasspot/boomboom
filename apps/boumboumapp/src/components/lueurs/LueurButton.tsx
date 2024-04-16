import React from "react";
import { SvgXml } from "react-native-svg";

import { BaseButtonProps } from "#components/buttons/BaseButton";
import {
  BaseButtonTheme,
  ThemedButton,
} from "#components/buttons/ThemedButton";
import lueurs from "#components/lueurs/assets/lueurs.svg";

export type LueurButtonProps = Omit<
  BaseButtonProps,
  "content" | "textColorName" | "colorName"
> & {
  content: string | number;
};
export const LueurButton = ({
  disabled,
  onPress,
  style,
  ...props
}: LueurButtonProps): JSX.Element => {
  return (
    <ThemedButton
      {...props}
      style={[style, disabled ? { opacity: 0.8 } : {}]}
      theme={BaseButtonTheme.CONTAINED}
      colorName="secondary"
      contentBackground={<SvgXml width="100%" height="100%" xml={lueurs} />}
      onPress={disabled ? () => {} : onPress}
      rippleColor={disabled ? "transparent" : undefined}
    />
  );
};
