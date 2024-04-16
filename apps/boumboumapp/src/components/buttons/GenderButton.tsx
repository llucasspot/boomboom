import { CreateOneProfileBodyGenderEnum } from "@boumboum/swagger-backend";
import React from "react";

import { BaseButtonIconPosition } from "#components/buttons/BaseButton";
import { IconName } from "#components/buttons/IconName";
import {
  BaseButtonTheme,
  ThemedButton,
} from "#components/buttons/ThemedButton";
import { BaseText } from "#components/texts/BaseText";

type GenderButtonProps = {
  gender: CreateOneProfileBodyGenderEnum;
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
  return (
    <ThemedButton
      colorName="secondary"
      onPress={onPress}
      icon={iconName}
      iconPosition={BaseButtonIconPosition.LEFT}
      content={<BaseText i18nKey={`component.GenderButton.${gender}`} />}
      theme={isSelected ? BaseButtonTheme.CONTAINED : BaseButtonTheme.INLINE}
    />
  );
}
