import React, { ReactNode, useMemo } from "react";
import {
  PressableProps,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { Props as ReactNativePaperButton } from "react-native-paper/lib/typescript/components/Button/Button";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import useEStyle from "../../hooks/useEStyle";
import { getEStyleSheetValue } from "../../utils/styleUtils";
import BaseIcon from "../Icons/BaseIcon";
import { IconName } from "../Icons/IconName";

export enum BaseButtonTheme {
  CONTAINED = "Contained",
  OUTLINED = "Outlined",
  INLINE = "Inline",
}

export enum BaseButtonIconPosition {
  RIGHT = "Right",
  LEFT = "Left",
}

type ContentType = ReactNode;

export type BaseButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  color?: string;
  textColor?: string;
  icon?: IconName | string;
  iconPosition?: BaseButtonIconPosition;
  theme?: BaseButtonTheme;
  content?: ContentType;
  contentBackground?: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
} & Omit<PressableProps, "style">;

export const BaseButton = ({
  loading = false,
  disabled = false,
  theme = BaseButtonTheme.CONTAINED,
  color = "$primaryColor",
  textColor = "$onPrimaryColor",
  content,
  contentBackground,
  icon,
  iconPosition = BaseButtonIconPosition.RIGHT,
  style: _style,
  textStyle: _textStyle,
  onPress,
}: BaseButtonProps): JSX.Element => {
  const style = useEStyle(_style);
  const textStyle: TextStyle = useEStyle(_textStyle);

  const iconColor = useMemo(() => {
    switch (theme) {
      case BaseButtonTheme.CONTAINED:
        return "$backgroundColor";
      case BaseButtonTheme.INLINE:
      case BaseButtonTheme.OUTLINED:
      default:
        return color;
    }
  }, [theme, color]);

  const esIconColor: string = getEStyleSheetValue(iconColor);

  const buttonColor: string =
    theme === BaseButtonTheme.CONTAINED
      ? getEStyleSheetValue(color)
      : "transparent";

  const buttonTextColor: string =
    theme === BaseButtonTheme.CONTAINED
      ? getEStyleSheetValue(textColor)
      : getEStyleSheetValue(color);

  const buttonStyle: ViewStyle = {
    borderRadius: getEStyleSheetValue("$smallBorderRadius"),
  };

  const Icon = (): null | JSX.Element => {
    if (!icon) {
      return null;
    }
    return (
      <BaseIcon
        name={icon as IconName}
        color={textStyle?.color ?? iconColor}
        size={iconSize}
      />
    );
  };

  const buttonIcon: IconSource | undefined = !Object.values(IconName).includes(
    icon as IconName,
  )
    ? icon
    : ({ size, color }) => {
        return <Icon />;
      };

  if (!content) {
    const iconMode: "outlined" | "contained" | undefined =
      theme === BaseButtonTheme.CONTAINED
        ? "contained"
        : theme === BaseButtonTheme.OUTLINED
          ? "outlined"
          : undefined;
    return (
      <IconButton
        iconColor={esIconColor}
        size={getEStyleSheetValue("$buttonFontSize")}
        loading={loading}
        disabled={disabled}
        onPress={onPress!}
        style={[buttonStyle, style]}
        icon={buttonIcon!}
        containerColor={buttonColor}
        mode={iconMode}
      />
    );
  }

  const iconSize =
    textStyle?.fontSize ?? getEStyleSheetValue<number>("$buttonIconFontSize");

  const mode: "text" | "outlined" | "contained" =
    theme === BaseButtonTheme.CONTAINED
      ? "contained"
      : theme === BaseButtonTheme.OUTLINED
        ? "outlined"
        : theme === BaseButtonTheme.INLINE
          ? "text"
          : "contained";

  const absoluteStyle: ViewStyle = {
    ...(StyleSheet.absoluteFill as object),
    overflow: "hidden",
  };

  const Background = () => {
    return <View style={absoluteStyle}>{contentBackground}</View>;
  };

  const buttonContentStyle: ViewStyle[] = [
    iconPosition === BaseButtonIconPosition.RIGHT
      ? {
          flexDirection: "row-reverse",
        }
      : {},
  ];
  const labelStyle: TextStyle[] = [
    {
      fontSize: getEStyleSheetValue("$buttonFontSize"),
    },
    textStyle ?? {},
  ];

  const propsWhenContentBackgroundIsNotSet: Pick<
    ReactNativePaperButton,
    "icon" | "onPress" | "disabled" | "loading" | "textColor"
  > = {
    icon: buttonIcon,
    loading,
    onPress: onPress!,
    disabled,
    textColor: buttonTextColor,
  };

  const propsButton = contentBackground
    ? {
        textColor: "transparent",
      }
    : propsWhenContentBackgroundIsNotSet;

  return (
    <View>
      <Button
        {...propsButton}
        style={[buttonStyle, style]}
        contentStyle={buttonContentStyle}
        buttonColor={buttonColor}
        mode={mode}
        labelStyle={labelStyle}
      >
        {content}
      </Button>
      {contentBackground && <Background />}
      {contentBackground && (
        <View style={absoluteStyle}>
          <Button
            labelStyle={labelStyle}
            contentStyle={buttonContentStyle}
            icon={buttonIcon}
            buttonColor="transparent"
            mode="contained"
            style={[
              {
                justifyContent: "center",
              },
              buttonStyle,
            ]}
            loading={loading}
            onPress={onPress!}
            disabled={disabled}
            textColor={buttonTextColor}
          >
            {content}
          </Button>
        </View>
      )}
    </View>
  );
};
