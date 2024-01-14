import { Control, Controller, FieldErrors } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

import { useCoreStyles } from "../../../services/StyleService/styles";
import {UserI} from "../../../services/UserService/userServiceI";

import LanguageService from "../../../services/LanguageService/LanguageService";
import ServiceInterface from "../../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../../tsyringe/diUtils";
import GenderSelector from "../../GenderSelector";
import { DatePicker } from "../../pickers/DatePicker";
import useEStyles from "../../../hooks/useEStyles";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export type UserFormData = Omit<UserI, 'profilePicture' | 'trackIds'>;

type UserProfileFormProps = {
  control: Control<UserFormData | Partial<UserFormData>, any>;
  errors: FieldErrors<UserFormData | Partial<UserFormData>>;
};

export function UserProfileForm({
  control,
  errors,
}: UserProfileFormProps) {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI
  );
  const I18n = languageService.useTranslation();

  const coreStyles = useCoreStyles();
    const styles = useEStyles({
        formContainer: {
            display: 'flex',
            gap: '$spacer5'
        },
        formErrorText: {
            color: '$errorColor'
        }
    });

  const FormErrorMessage = () => (
    <Text style={styles.formErrorText}>{I18n.t("component.UserProfileForm.errorMessage")}</Text>
  );

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.formContainer}>
      <Controller
        control={control}
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
      />
      {errors.dateOfBirth && <FormErrorMessage />}

      <Controller
        control={control}
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
    </KeyboardAwareScrollView>
  );
}
