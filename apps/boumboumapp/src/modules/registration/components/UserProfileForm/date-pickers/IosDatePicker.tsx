import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";

export const IosDatePicker = ({
  controllerOnChange,
  dateFormatter,
}: {
  controllerOnChange: (date: string) => void;
  dateFormatter: (date: Date) => string;
}) => {
  const [date, setDate] = useState(new Date());

  const onChange =
    (controllerOnChange: (date: string) => void) =>
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      controllerOnChange(dateFormatter(currentDate));
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
  return <Picker />;
};
