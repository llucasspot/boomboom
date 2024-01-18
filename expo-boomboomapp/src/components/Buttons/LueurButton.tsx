import React from "react";
import { SvgXml } from "react-native-svg";

import { BaseButton, BaseButtonProps, BaseButtonTheme } from "./BaseButton";
import lueurs from "../../assets/lueurs.svg";

export type LueurButtonProps = Omit<
  BaseButtonProps,
  "content" | "textColor" | "color"
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
    <BaseButton
      {...props}
      style={[style, disabled ? { opacity: 0.8 } : {}]}
      theme={BaseButtonTheme.CONTAINED}
      color="$secondaryColor"
      textColor="$onSecondaryColor"
      contentBackground={<SvgXml width="100%" height="100%" xml={lueurs} />}
      onPress={disabled ? () => {} : onPress}
      rippleColor={disabled ? "transparent" : undefined}
    />
  );
};
