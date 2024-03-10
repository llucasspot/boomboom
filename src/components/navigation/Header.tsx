import { useNavigation } from "@react-navigation/core";
import { NavigationProp } from "@react-navigation/core/src/types";
import React from "react";
import { Text, View } from "react-native";

import { ReturnButton } from "./ReturnButton";

import useEStyles from "#hooks/useEStyles";
import { RootStackParamsList } from "#navigation/RootStackScreenNavigator/RootStack";
import { useCoreStyles } from "#services/StyleService/styles";

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

  const coreStyles = useCoreStyles();
  const styles = useEStyles({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 30,
      paddingTop: "$spacer2",
    },
  });

  return (
    <View style={styles.header}>
      {title && (
        <Text style={coreStyles.H3} numberOfLines={2}>
          {title}
        </Text>
      )}
      <ReturnButton goBack={goBack} onPress={onGoBack || navigation.goBack} />
    </View>
  );
}
