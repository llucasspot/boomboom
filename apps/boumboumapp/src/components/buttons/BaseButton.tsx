import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { TextProps } from "react-native/Libraries/Text/Text";
import { Button, ButtonProps, IconButton } from "react-native-paper";
import { Props as ReactNativePaperButtonProps } from "react-native-paper/lib/typescript/components/Button/Button";

import { IconName } from "#components/buttons/IconName";
import { diService } from "#modules/core/di/di-utils";
import { LanguageService } from "#modules/core/language/language.service";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";

export enum BaseButtonIconPosition {
  RIGHT = "Right",
  LEFT = "Left",
}

type ContentType = ReactNode;

export type BaseButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  colorName?: keyof AppTheme["colors"] | string;
  textColorName?: keyof AppTheme["colors"] | string;
  icon?: IconName;
  iconPosition?: BaseButtonIconPosition;
  content?: ContentType;
  contentBackground?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  mode?: "outlined" | "contained" | "contained-tonal" | "text" | "elevated";
  iconMode?: "outlined" | "contained" | "contained-tonal";
} & Pick<ReactNativePaperButtonProps, "onPress" | "rippleColor">;

export const BaseButton = ({
  loading = false,
  disabled = false,
  colorName = "onSecondaryContainer",
  textColorName = "onSecondary",
  iconPosition = BaseButtonIconPosition.RIGHT,
  content,
  contentBackground,
  icon,
  style,
  textStyle,
  onPress,
  rippleColor,
  mode = "contained",
  iconMode = "contained",
}: BaseButtonProps): JSX.Element => {
  const languageService = diService.getInstance(LanguageService);
  const I18n = languageService.useTranslation();
  const appTheme = useAppTheme();
  const styles = useAppThemeStyle((appTheme) =>
    createStyleSheet({
      buttonStyle: {
        borderRadius: appTheme.borderRadius.smallBorderRadius,
      },
    }),
  );

  const defaultButtonStyle = textStyle ?? appTheme.tags.buttonText;
  const fontSize = defaultButtonStyle.fontSize ?? 16;
  const buttonStyle: ButtonProps["style"] = [
    defaultButtonStyle,
    styles.buttonStyle,
  ];

  // @ts-ignore
  const buttonColor: string = appTheme.colors[colorName] ?? colorName;

  // @ts-ignore
  const textColor: string = appTheme.colors[textColorName] ?? textColorName;
  const iconColor: string = textColor;

  if (!content) {
    return (
      <>
        {icon && (
          <IconButton
            size={fontSize}
            iconColor={iconColor}
            loading={loading}
            disabled={disabled}
            onPress={onPress!}
            style={[buttonStyle, style]}
            icon={icon}
            containerColor={buttonColor}
            mode={iconMode}
          />
        )}
      </>
    );
  }

  const absoluteStyle: ViewStyle = {
    ...(StyleSheet.absoluteFill as object),
    overflow: "hidden",
  };

  const Background = () => {
    return <View style={absoluteStyle}>{contentBackground}</View>;
  };

  const buttonContentStyle: Record<BaseButtonIconPosition, ViewStyle> = {
    [BaseButtonIconPosition.RIGHT]: {
      flexDirection: "row-reverse",
    },
    [BaseButtonIconPosition.LEFT]: {},
  };

  const labelStyle: TextProps["style"] = [
    {
      // fontSize: styles.buttonStyle.fontSize,
    },
    textStyle ?? {},
  ];

  const propsButton = contentBackground
    ? {
        textColor: "transparent",
      }
    : {
        icon,
        loading,
        onPress: onPress!,
        disabled,
        textColor,
      };

  function Content() {
    if (typeof content === "string") {
      return I18n.t(content);
    }
    return content;
  }

  return (
    <View>
      <Button
        {...propsButton}
        style={[buttonStyle, style]}
        contentStyle={buttonContentStyle[iconPosition]}
        buttonColor={buttonColor}
        mode={mode}
        labelStyle={labelStyle}
        rippleColor={rippleColor}
      >
        <Content />
      </Button>
      {contentBackground && <Background />}
      {contentBackground && (
        <View style={absoluteStyle}>
          <Button
            labelStyle={labelStyle}
            contentStyle={buttonContentStyle[iconPosition]}
            icon={icon}
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
            textColor={textColor}
            rippleColor={rippleColor}
          >
            <Content />
          </Button>
        </View>
      )}
    </View>
  );
};
