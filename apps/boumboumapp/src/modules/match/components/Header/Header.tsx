import { useNavigation } from "@react-navigation/core";
import { NavigationProp } from "@react-navigation/core/src/types";
import React from "react";
import { Text, View } from "react-native";

import { ReturnButton } from "./components/ReturnButton";

import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { RootStackParamsList } from "#modules/match/Root.stack";

type HeaderProps = {
  title?: string | null;
  goBack?: boolean;
  onGoBack?: () => void;
};

export function Header({
  goBack = true,
  title,
  onGoBack,
}: Readonly<HeaderProps>) {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;
  const styles = useAppThemeStyle((appTheme) =>
    createStyleSheet({
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingTop: appTheme.spacers.spacer2,
      },
    }),
  );

  return (
    <View style={styles.header}>
      {title && (
        <Text style={tagStyles.h3} numberOfLines={2}>
          {title}
        </Text>
      )}
      <ReturnButton goBack={goBack} onPress={onGoBack || navigation.goBack} />
    </View>
  );
}
