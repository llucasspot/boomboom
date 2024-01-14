import React from "react";

import { GenderButton } from "./Buttons/GenderButton";
import { IconName } from "./Icons/IconName";
import useEStyles from "../hooks/useEStyles";
import { Gender } from "../services/UserService/userServiceI";
import { View } from "react-native";

type GenderSelectorProps = {
  onChange: (selectedGender: Gender) => void;
  value?: Gender;
};

export default function GenderSelector({
  onChange,
  value = Gender.NO_SPECIFIC,
}: GenderSelectorProps) {
  const isSelectedGender = (gender: Gender) => value === gender;

  const styles = useEStyles({
    selectGenderContainer: {
      flexDirection: "row",
      paddingTop: "$spacer3",
      justifyContent: "space-between",
    },
  });
  return (
    <View style={styles.selectGenderContainer}>
      <GenderButton
        gender={Gender.MALE}
        onPress={() => onChange(Gender.MALE)}
        isSelected={isSelectedGender(Gender.MALE)}
        iconName={IconName.MALE_GENDER}
      />
      <GenderButton
        gender={Gender.FEMALE}
        onPress={() => onChange(Gender.FEMALE)}
        isSelected={isSelectedGender(Gender.FEMALE)}
        iconName={IconName.FEMALE_GENDER}
      />
      <GenderButton
        gender={Gender.NO_SPECIFIC}
        onPress={() => onChange(Gender.NO_SPECIFIC)}
        isSelected={isSelectedGender(Gender.NO_SPECIFIC)}
        iconName={IconName.NO_SPECIFIC_GENDER}
      />
    </View>
  );
}
