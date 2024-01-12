import { Text } from "react-native";
import React from "react";
import { useCoreStyles } from "../../services/StyleService/styles";
import { View } from "../../../components/Themed";
import useEStyles from "../../hooks/useEStyles";
import { ReturnButton } from "./ReturnButton";
import { useNavigation } from "expo-router";

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
  const navigation = useNavigation();

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
