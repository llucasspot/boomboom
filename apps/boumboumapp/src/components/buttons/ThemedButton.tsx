import React, { ComponentProps } from "react";

import { BaseButton } from "#components/buttons/BaseButton";
import { AppTheme } from "#modules/core/style/themes/beans/theme";

export enum BaseButtonTheme {
  CONTAINED = "Contained",
  OUTLINED = "Outlined",
  INLINE = "Inline",
}

type ThemedButtonProps = {
  theme?: BaseButtonTheme;
  colorName?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "background"
    | "success";
} & Omit<ComponentProps<typeof BaseButton>, "textColorName" | "colorName">;

export const ThemedButton = ({
  theme = BaseButtonTheme.CONTAINED,
  colorName = "secondary",
  ...props
}: ThemedButtonProps): JSX.Element => {
  const overriddenProps: Record<
    BaseButtonTheme,
    ComponentProps<typeof BaseButton>
  > = {
    [BaseButtonTheme.CONTAINED]: {
      colorName: colors[colorName].colorName,
      textColorName: colors[colorName].textColorName,
      mode: "contained",
      iconMode: "contained",
    },
    [BaseButtonTheme.OUTLINED]: {
      colorName: colors[colorName].textColorName,
      textColorName: colors[colorName].colorName,
      mode: "outlined",
      iconMode: "outlined",
    },
    [BaseButtonTheme.INLINE]: {
      colorName: "transparent",
      textColorName: colors[colorName].colorName,
      mode: "text",
      iconMode: undefined,
    },
  };

  return <BaseButton {...overriddenProps[theme]} {...props} />;
};

const colors: Record<
  "primary" | "secondary" | "tertiary" | "error" | "background" | "success",
  {
    colorName: keyof AppTheme["colors"];
    textColorName: keyof AppTheme["colors"];
  }
> = {
  background: { colorName: "background", textColorName: "onBackground" },
  error: { colorName: "error", textColorName: "onError" },
  primary: { colorName: "primary", textColorName: "onPrimary" },
  secondary: {
    colorName: "onSecondaryContainer",
    textColorName: "onSecondary",
  },
  success: { colorName: "success", textColorName: "onSuccess" },
  tertiary: { colorName: "tertiary", textColorName: "onTertiary" },
};
