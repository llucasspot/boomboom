import React from "react";
import { IconName } from "../Icons/IconName";
import {
  BaseButton,
  BaseButtonIconPosition,
  BaseButtonTheme,
} from "./BaseButton";
import {
  Gender,
  GenderTextMapping,
} from "../../services/UserService/userServiceI";
import useEStyles from "../../hooks/useEStyles";

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
  const styles = useEStyles({
    buttonText: {
      fontSize: "0.8rem",
    },
  });
  return (
    <BaseButton
      onPress={onPress}
      icon={iconName}
      color={"$secondaryColor"}
      iconPosition={BaseButtonIconPosition.LEFT}
      content={GenderTextMapping[gender]}
      textStyle={styles.buttonText}
      theme={isSelected ? BaseButtonTheme.CONTAINED : BaseButtonTheme.OUTLINED}
    />
  );
}
