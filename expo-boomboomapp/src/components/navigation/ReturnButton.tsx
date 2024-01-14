import React from "react";
import useEStyles from "../../hooks/useEStyles";
import { Text, View } from "../../../components/Themed";
import BaseIcon from "../Icons/BaseIcon";
import { IconName } from "../Icons/IconName";
import { Pressable } from "react-native";
import { getGlobalInstance } from "../../tsyringe/diUtils";
import LanguageService from "../../services/LanguageService/LanguageService";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import { getEStyleSheetValue } from "../../utils/styleUtils";

type ReturnButtonProps = {
  goBack?: boolean;
  onPress: () => void;
};

export function ReturnButton({
  goBack = true,
  onPress,
}: Readonly<ReturnButtonProps>) {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );

  const styles = useEStyles({
    goBackButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    iconContainer: {
      borderRadius: "$circleBorderRadius",
      padding: "$spacer1",
      borderColor: "$borderColor",
      borderWidth: 1,
    },
    back: {
      color: "$secondaryColor",
    },
  });
  const iconSize = getEStyleSheetValue<number>("$buttonFontSize");

  const I18n = languageService.useTranslation();

  if (!goBack) {
    return null;
  }

  return (
    <Pressable onPress={onPress} style={styles.goBackButton}>
      <Text style={styles.back}>{I18n.t("component.ReturnButton.back")}</Text>
      <View style={styles.iconContainer}>
        <BaseIcon
          size={iconSize}
          name={IconName.ARROW_RIGHT}
          color="$secondaryColor"
        />
      </View>
    </Pressable>
  );
}
