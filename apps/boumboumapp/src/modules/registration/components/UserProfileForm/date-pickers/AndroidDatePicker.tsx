import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { View } from "react-native";

import {
  BaseButtonTheme,
  ThemedButton,
} from "#components/buttons/ThemedButton";

export const AndroidDatePicker = ({
  controllerOnChange,
  dateFormatter,
}: {
  controllerOnChange: (date: string) => void;
  dateFormatter: (date: Date) => string;
}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange =
    (controllerOnChange: (date: string) => void) =>
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);
      controllerOnChange(dateFormatter(currentDate));
    };

  const showMode = () => {
    setShow(true);
  };

  const Picker = () => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour
        display="default"
        onChange={onChange(controllerOnChange)}
      />
    );
  };
  return (
    <>
      <View>
        <ThemedButton
          colorName="secondary"
          theme={BaseButtonTheme.INLINE}
          onPress={showMode}
          content={date.toLocaleDateString()}
        />
      </View>
      {show && <Picker />}
    </>
  );
};
