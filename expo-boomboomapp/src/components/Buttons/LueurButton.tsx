import React from "react";
import { SvgXml } from "react-native-svg";

import { BaseButton, BaseButtonProps, BaseButtonTheme } from "./BaseButton";
import lueurs from "../../assets/lueurs.svg";

export type LueurButtonProps = Omit<BaseButtonProps, "content"> & {
  content: string | number;
};
export const LueurButton = ({
  color: _color,
  textColor: _textColor,
  ...props
}: LueurButtonProps): JSX.Element => {
  return (
    <BaseButton
      {...props}
      theme={BaseButtonTheme.CONTAINED}
      color={_color ?? "$secondaryColor"}
      textColor={_color ?? "$onSecondaryColor"}
      contentBackground={<SvgXml width="100%" height="100%" xml={lueurs} />}
    />
  );
};
