import { CreateOneProfileBodyGenderEnum } from "@boumboum/swagger-backend";
import React from "react";
import { View } from "react-native";

import { GenderButton } from "#components/buttons/GenderButton";
import { IconName } from "#components/buttons/IconName";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";

type GenderSelectorProps = {
  onChange: (
    selectedGender:
      | CreateOneProfileBodyGenderEnum
      | CreateOneProfileBodyGenderEnum[],
  ) => void;
  value?: CreateOneProfileBodyGenderEnum | CreateOneProfileBodyGenderEnum[];
};

export function GenderSelector({ onChange, value }: GenderSelectorProps) {
  const isSelectedGender = (gender: CreateOneProfileBodyGenderEnum) => {
    if (Array.isArray(value)) {
      return value.includes(gender);
    }
    return value === gender;
  };

  const styles = useAppThemeStyle((appTheme) =>
    createStyleSheet({
      selectGenderContainer: {
        flexDirection: "row",
        paddingTop: appTheme.spacers.spacer3,
        justifyContent: "space-between",
      },
    }),
  );

  const add = (gender: CreateOneProfileBodyGenderEnum) => {
    if (!Array.isArray(value)) {
      return onChange(gender);
    }
    if (isSelectedGender(gender)) {
      return onChange([...value.filter((item) => item !== gender)]);
    }
    return onChange([...value, gender]);
  };

  return (
    <View style={styles.selectGenderContainer}>
      <GenderButton
        gender={CreateOneProfileBodyGenderEnum.Male}
        onPress={() => add(CreateOneProfileBodyGenderEnum.Male)}
        isSelected={isSelectedGender(CreateOneProfileBodyGenderEnum.Male)}
        iconName={IconName.MALE_GENDER}
      />
      <GenderButton
        gender={CreateOneProfileBodyGenderEnum.Female}
        onPress={() => add(CreateOneProfileBodyGenderEnum.Female)}
        isSelected={isSelectedGender(CreateOneProfileBodyGenderEnum.Female)}
        iconName={IconName.FEMALE_GENDER}
      />
      <GenderButton
        gender={CreateOneProfileBodyGenderEnum.NonBinary}
        onPress={() => add(CreateOneProfileBodyGenderEnum.NonBinary)}
        isSelected={isSelectedGender(CreateOneProfileBodyGenderEnum.NonBinary)}
        iconName={IconName.NO_SPECIFIC_GENDER}
      />
    </View>
  );
}
