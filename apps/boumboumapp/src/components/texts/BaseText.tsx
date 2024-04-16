import type { TOptions } from "i18next";
import React from "react";
import { Trans } from "react-i18next";
import { Text } from "react-native";
import { TextProps } from "react-native/Libraries/Text/Text";

import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";

export type BaseTextProps = {
  textColorName?: keyof AppTheme["colors"] | string;
  style?: TextProps["style"];
  i18nKey: string;
  i18nOptions?: TOptions;
};

export const BaseText = ({
  textColorName,
  style,
  i18nKey,
  i18nOptions,
}: BaseTextProps): JSX.Element => {
  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;

  // @ts-ignore
  const textColor = appTheme.colors[textColorName] ?? textColorName;

  const labelStyle: TextProps["style"] = [
    tagStyles.p,
    textColor && {
      color: textColor,
    },
    style ?? {},
  ];

  return (
    <Text style={labelStyle}>
      <Trans i18nKey={i18nKey} tOptions={i18nOptions} />
    </Text>
  );
};
