import { Control, Controller, FieldErrors } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

import { useCoreStyles } from "../../../services/StyleService/styles";
import { UserStateConnected } from "../../../services/UserService/userServiceI";

import LanguageService from "../../../services/LanguageService/LanguageService";
import ServiceInterface from "../../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../../tsyringe/diUtils";
import GenderSelector from "../../GenderSelector";
import { DatePicker } from "../../pickers/DatePicker";

export type UserFormProps = Partial<Omit<UserStateConnected, "isConnected">>;

type UserProfileFormProps = {
  inputsIsRequired?: boolean;
  control: Control;
  errors: FieldErrors;
};

export function UserProfileForm({
  inputsIsRequired = true,
  control,
  errors,
}: Readonly<UserProfileFormProps>) {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI
  );

  const I18n = languageService.useTranslation();

  const coreStyles = useCoreStyles();

  const FormErrorMessage = () => (
    <Text>{I18n.t("component.UserProfileForm.errorMessage")}</Text>
  );

  return (
    <View style={{ gap: 32 }}>
      <Controller
        control={control}
        rules={{
          required: inputsIsRequired,
        }}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={{ ...coreStyles.P }}>{I18n.t("common.fullName")}</Text>
            <TextInput
              style={{ ...coreStyles.INPUT_TEXT }}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="John Doe"
            />
          </View>
        )}
      />
      {errors.fullName && <FormErrorMessage />}

      <DatePicker
        title={I18n.t("common.dateOfBirth")}
        control={control}
        isRequired={inputsIsRequired}
      />
      {errors.dateOfBirth && <FormErrorMessage />}

      <Controller
        control={control}
        rules={{
          required: inputsIsRequired,
        }}
        name="gender"
        render={({ field: { onChange, value } }) => (
          <View>
            <Text style={{ ...coreStyles.P }}>{I18n.t("common.gender")}</Text>
            <GenderSelector onChange={onChange} value={value} />
          </View>
        )}
      />
      {errors.gender && <FormErrorMessage />}

      <Controller
        control={control}
        rules={{
          required: inputsIsRequired,
        }}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={coreStyles.P}>{I18n.t("common.description")}</Text>
            <TextInput
              style={{ ...coreStyles.INPUT_TEXT }}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={I18n.t("common.description")}
            />
          </View>
        )}
      />
      {errors.description && <FormErrorMessage />}
    </View>
  );
}
