import React, {useCallback, useRef, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {getGlobalInstance} from '../../tsyringe/diUtils';
import ServiceInterface from '../../tsyringe/ServiceInterface';
import LanguageService from '../../services/LanguageService/LanguageService';
import useEStyles from '../../hooks/useEStyles';
import {
  RootStackScreen,
  RootStackScreenParamsList,
} from '../../navigation/RootStackScreenNavigator/RootStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import UserService from '../../services/UserService/UserService';
import {StepScreenLayout} from '../../components/StepScreenLayout';
import BaseButton, {BaseButtonTheme} from '../../components/Buttons/BaseButton';
import {IconName} from '../../components/Icons/IconName';
import {Gender} from '../../services/UserService/userServiceI';

type SetUserDetailScreenScreenProps = NativeStackScreenProps<
  RootStackScreenParamsList,
  RootStackScreen.SECOND_STEP
>;

export const SetUserDetailScreen = ({
  navigation,
}: SetUserDetailScreenScreenProps): JSX.Element => {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );
  const userService = getGlobalInstance<UserService>(
    ServiceInterface.UserService,
  );
  const I18n = languageService.useTranslation();
  const styles = useEStyles({
    content: {},
    title: {
      color: '$secondaryColor',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    genderContainer: {
      flexDirection: 'row',
    },
  });
  const fullNameTextInputRef = useRef<TextInput>();
  const dateOfBirthTextInputRef = useRef<TextInput>();
  const descriptionTextInputRef = useRef<TextInput>();
  const [selectedGender, setSelectedGender] = useState<Gender>(Gender.MALE);
  const isSelectedGender = useCallback(
    (gender: Gender) => {
      return selectedGender === gender;
    },
    [selectedGender],
  );

  const handleNextStep = async () => {
    userService.updateUserState({
      // @ts-ignore
      fullName: fullNameTextInputRef.current.value,
      // @ts-ignore
      description: descriptionTextInputRef.current.value,
      // @ts-ignore
      dateOfBirth: dateOfBirthTextInputRef.current.value,
      gender: selectedGender,
    });
    navigation.navigate(RootStackScreen.THIRD_STEP);
  };

  return (
    <StepScreenLayout
      handleNextStep={handleNextStep}
      stepNumber={2}
      contentStyle={styles.content}>
      <Text>{I18n.t('common.fullName')}</Text>
      <TextInput
        // @ts-ignore
        ref={fullNameTextInputRef}
        // @ts-ignore
        onChangeText={e => (fullNameTextInputRef.current.value = e)}
        placeholder={'John Doe'}
      />
      <Text>{I18n.t('common.dateOfBirth')}</Text>
      <TextInput
        // @ts-ignore
        ref={dateOfBirthTextInputRef}
        // @ts-ignore
        onChangeText={e => (dateOfBirthTextInputRef.current.value = e)}
        placeholder={'MM/DD/YY'}
      />
      <Text>{I18n.t('common.gender')}</Text>
      <View style={styles.genderContainer}>
        <BaseButton
          onPress={() => setSelectedGender(Gender.MALE)}
          icon={IconName.MALE_GENDER}
          color={'$secondaryColor'}
          theme={
            isSelectedGender(Gender.MALE)
              ? BaseButtonTheme.CONTAINED
              : BaseButtonTheme.OUTLINED
          }
        />
        <BaseButton
          onPress={() => setSelectedGender(Gender.FEMALE)}
          icon={IconName.FEMALE_GENDER}
          color={'$secondaryColor'}
          theme={
            isSelectedGender(Gender.FEMALE)
              ? BaseButtonTheme.CONTAINED
              : BaseButtonTheme.OUTLINED
          }
        />
        <BaseButton
          onPress={() => setSelectedGender(Gender.NO_SPECIFIC)}
          icon={IconName.NO_SPECIFIC_GENDER}
          color={'$secondaryColor'}
          theme={
            isSelectedGender(Gender.NO_SPECIFIC)
              ? BaseButtonTheme.CONTAINED
              : BaseButtonTheme.OUTLINED
          }
        />
      </View>
      <Text>{I18n.t('common.description')}</Text>
      <TextInput
        // @ts-ignore
        ref={descriptionTextInputRef}
        // @ts-ignore
        onChangeText={e => (descriptionTextInputRef.current.value = e)}
        placeholder={I18n.t('common.description')}
      />
    </StepScreenLayout>
  );
};
