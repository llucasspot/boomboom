import React from "react";
import { Control, Controller } from "react-hook-form";
import { Platform, View } from "react-native";

import { AndroidDatePicker } from "./AndroidDatePicker";
import { IosDatePicker } from "./IosDatePicker";

import { BaseText } from "#components/texts/BaseText";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { UserFormData } from "#modules/registration/components/UserProfileForm/UserProfileForm";

type DatePickerProps = {
  title: string;
  control: Control<UserFormData, any>;
};

export function DatePicker({ title, control }: Readonly<DatePickerProps>) {
  const isIos = Platform.OS === "ios";

  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;

  function formatDate(date: Date): string {
    // Padding function to ensure day and month are always two digits
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    return `${year}-${month}-${day}`;
  }

  const Picker = ({
    controllerOnChange,
  }: {
    controllerOnChange: (date: string) => void;
  }) => {
    if (isIos) {
      return (
        <IosDatePicker
          controllerOnChange={controllerOnChange}
          dateFormatter={formatDate}
        />
      );
    }
    return (
      <AndroidDatePicker
        controllerOnChange={controllerOnChange}
        dateFormatter={formatDate}
      />
    );
  };

  return (
    <Controller
      control={control}
      name="dateOfBirth"
      defaultValue={new Date()}
      render={({ field: { onChange: controllerOnChange, onBlur, value } }) => (
        <View>
          <BaseText style={[tagStyles.p]} i18nKey={title} />
          <Picker controllerOnChange={controllerOnChange} />
        </View>
      )}
    />
  );
}
