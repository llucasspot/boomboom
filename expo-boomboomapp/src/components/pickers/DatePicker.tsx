import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Platform, View, Text } from "react-native";

import { useCoreStyles } from "../../services/StyleService/styles";
import { BaseButton, BaseButtonTheme } from "../Buttons/BaseButton";
import { type UserFormData } from "../matching/common/UserProfileForm";

type DatePickerProps = {
  title: string;
  control: Control<UserFormData, any>;
};

type ModeType = "date";

export function DatePicker({ title, control }: Readonly<DatePickerProps>) {
  const coreStyles = useCoreStyles();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<ModeType>("date");
  const [show, setShow] = useState(false);

  const onChange =
    (controllerOnChange: (date: string) => void) =>
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === "ios");
      setDate(currentDate);
      controllerOnChange(formatDate(currentDate));
    };

  function formatDate(date: Date): string {
    // Padding function to ensure day and month are always two digits
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    return `${year}-${month}-${day}`;
  }

  const showMode = (currentMode: ModeType) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // TODO: Should use : https://www.npmjs.com/package/react-native-date-picker
  return (
    <Controller
      control={control}
      name="dateOfBirth"
      defaultValue={formatDate(new Date())}
      render={({ field: { onChange: controllerOnChange, onBlur, value } }) => (
        <View>
          <Text style={{ ...coreStyles.P }}>{title}</Text>
          <View>
            <BaseButton
              color="$secondaryColor"
              theme={BaseButtonTheme.INLINE}
              onPress={showDatepicker}
              content={date.toLocaleDateString()}
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour
              display="default"
              onChange={onChange(controllerOnChange)}
            />
          )}
        </View>
      )}
    />
  );
}
