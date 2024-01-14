import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInput } from "react-native";
import { Text, View } from "../../../components/Themed";
import { useCoreStyles } from "../../services/StyleService/styles";
import { type UserFormData } from "../matching/common/UserProfileForm";

type DatePickerProps = {
  title: string;
  control: Control<UserFormData | Partial<UserFormData>, any>;
  isRequired?: boolean;
};

export function DatePicker({
  title,
  control,
  isRequired = true,
}: Readonly<DatePickerProps>) {
  const coreStyles = useCoreStyles();

  // TODO: Should use : https://www.npmjs.com/package/react-native-date-picker
  return (
    <Controller
      control={control}
      rules={{
        required: isRequired,
      }}
      name="dateOfBirth"
      render={({ field: { onChange, onBlur, value } }) => (
        <View>
          <Text style={{ ...coreStyles.P }}>{title}</Text>
          <TextInput
            style={{ ...coreStyles.INPUT_TEXT }}
            value={value?.toString()}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="yyyy-MM-dd"
          />
        </View>
      )}
    />
  );
}
