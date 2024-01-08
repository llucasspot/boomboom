import React, { useCallback } from "react";
import { Gender } from "../services/UserService/userServiceI";
import useEStyles from "../hooks/useEStyles";
import { View } from "../../components/Themed";
import { GenderButton } from "./Buttons/GenderButton";
import { IconName } from "./Icons/IconName";

type GenderSelectorProps = {
  selectedGender: Gender;
  setSelectedGender: React.Dispatch<React.SetStateAction<Gender>>;
};

export default function GenderSelector({
  selectedGender,
  setSelectedGender,
}: Readonly<GenderSelectorProps>) {
  const isSelectedGender = useCallback(
    (gender: Gender) => {
      return selectedGender === gender;
    },
    [selectedGender]
  );
  const styles = useEStyles({
    selectGenderContainer: {
      flexDirection: "row",
      paddingTop: "0.8rem",
      justifyContent: "space-between",
    },
  });
  return (
    <View style={styles.selectGenderContainer}>
      <GenderButton
        gender={Gender.MALE}
        onPress={() => setSelectedGender(Gender.MALE)}
        isSelected={isSelectedGender(Gender.MALE)}
        iconName={IconName.MALE_GENDER}
      />
      <GenderButton
        gender={Gender.FEMALE}
        onPress={() => setSelectedGender(Gender.FEMALE)}
        isSelected={isSelectedGender(Gender.FEMALE)}
        iconName={IconName.FEMALE_GENDER}
      />
      <GenderButton
        gender={Gender.NO_SPECIFIC}
        onPress={() => setSelectedGender(Gender.NO_SPECIFIC)}
        isSelected={isSelectedGender(Gender.NO_SPECIFIC)}
        iconName={IconName.NO_SPECIFIC_GENDER}
      />
    </View>
  );
}
