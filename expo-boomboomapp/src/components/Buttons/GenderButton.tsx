import React from "react";

import {
  BaseButton,
  BaseButtonIconPosition,
  BaseButtonTheme,
} from "./BaseButton";
import useEStyles from "../../hooks/useEStyles";
import LanguageService from "../../services/LanguageService/LanguageService";
import { Gender } from "../../services/UserService/userServiceI";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../tsyringe/diUtils";
import { IconName } from "../Icons/IconName";

type GenderButtonProps = {
  gender: Gender;
  onPress: () => void;
  isSelected: boolean;
  iconName: IconName;
};

export function GenderButton({
  gender,
  onPress,
  isSelected,
  iconName,
}: Readonly<GenderButtonProps>) {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );

  const I18n = languageService.useTranslation();

  const styles = useEStyles({
    buttonText: {
      fontSize: "$pFontSize",
    },
  });
  return (
    <BaseButton
      onPress={onPress}
      icon={iconName}
      color="$secondaryColor"
      iconPosition={BaseButtonIconPosition.LEFT}
      content={I18n.t(`component.GenderButton.${gender}`)}
      textStyle={styles.buttonText}
      theme={isSelected ? BaseButtonTheme.CONTAINED : BaseButtonTheme.OUTLINED}
    />
  );
}
