import React from "react";
import { Control, Controller } from "react-hook-form";
import { Platform, Text, View } from "react-native";

import { AndroidDatePicker } from "./AndroidDatePicker";
import { IosDatePicker } from "./IosDatePicker";
import { useCoreStyles } from "../../services/StyleService/styles";
import { type UserFormData } from "../matching/common/UserProfileForm";

type DatePickerProps = {
  title: string;
  control: Control<UserFormData, any>;
};

export function DatePicker({ title, control }: Readonly<DatePickerProps>) {
  const isIos = Platform.OS === "ios";
  const coreStyles = useCoreStyles();

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
      return <IosDatePicker controllerOnChange={controllerOnChange} dateFormatter={formatDate} />;
    }
    return <AndroidDatePicker controllerOnChange={controllerOnChange} dateFormatter={formatDate} />;
  };

  return (
    <Controller
      control={control}
      name="dateOfBirth"
      defaultValue={formatDate(new Date())}
      render={({ field: { onChange: controllerOnChange, onBlur, value } }) => (
        <View>
          <Text style={{ ...coreStyles.P }}>{title}</Text>
          <Picker controllerOnChange={controllerOnChange} />
        </View>
      )}
    />
  );
}
