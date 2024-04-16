import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { BaseText } from "#components/texts/BaseText";
import { diService } from "#modules/core/di/di-utils";
import { LanguageService } from "#modules/core/language/language.service";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";
import { GenderSelector } from "#modules/registration/components/UserProfileForm/GenderSelector";
import { DatePicker } from "#modules/registration/components/UserProfileForm/date-pickers/DatePicker";
import { RegistrationState } from "#modules/registration/services/RegistrationState.manager";

export type UserFormData = Omit<
  Required<RegistrationState>,
  "profilePictureUri"
>;

type UserProfileFormProps = {
  control: Control<UserFormData, any>;
  errors: FieldErrors<UserFormData | Partial<UserFormData>>;
};

export function UserProfileForm({ control, errors }: UserProfileFormProps) {
  const languageService = diService.getInstance(LanguageService);
  const I18n = languageService.useTranslation();

  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;
  const styles = useAppThemeStyle(makeStyles);

  const FormErrorMessage = () => (
    <BaseText
      i18nKey="component.UserProfileForm.errorMessage"
      style={[tagStyles.p, styles.formErrorText]}
    />
  );

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.formContainer}>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <BaseText i18nKey="common.fullName" style={[tagStyles.p]} />
            <TextInput
              style={[tagStyles.INPUT_TEXT]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="John Doe"
            />
          </View>
        )}
      />
      {errors.fullName && <FormErrorMessage />}

      <DatePicker title={I18n.t("common.dateOfBirth")} control={control} />
      {errors.dateOfBirth && <FormErrorMessage />}

      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value } }) => (
          <View>
            <BaseText i18nKey="common.gender" style={[tagStyles.p]} />
            <GenderSelector onChange={onChange} value={value} />
          </View>
        )}
      />
      {errors.gender && <FormErrorMessage />}

      <Controller
        control={control}
        name="gendersToShow"
        render={({ field: { onChange, value } }) => (
          <View>
            <BaseText i18nKey="common.gendersToShow" style={[tagStyles.p]} />
            <GenderSelector onChange={onChange} value={value} />
          </View>
        )}
      />
      {errors.gendersToShow && <FormErrorMessage />}

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <BaseText i18nKey="common.description" style={[tagStyles.p]} />
            <TextInput
              style={[tagStyles.INPUT_TEXT]}
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

const makeStyles = (appTheme: AppTheme) =>
  createStyleSheet({
    formContainer: {
      display: "flex",
      gap: appTheme.spacers.spacer5,
    },
    formErrorText: {
      color: appTheme.colors.error,
    },
  });
