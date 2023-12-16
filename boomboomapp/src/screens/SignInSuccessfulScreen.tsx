import React from 'react';
import {Image, ImageStyle, SafeAreaView, Text, View} from 'react-native';
import {getGlobalInstance} from '../tsyringe/diUtils';
import ServiceInterface from '../tsyringe/ServiceInterface';
import LanguageService from '../services/LanguageService/LanguageService';
import useEStyles from '../hooks/useEStyles';
import {LueurButton} from '../components/Buttons/LueurButton';
import {
  RootStackScreen,
  RootStackScreenParamsList,
} from '../navigation/RootStackScreenNavigator/RootStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Logo} from '../components/Logo';
import successLogo from '../assets/success.png';

type SignInSuccessfulProps = NativeStackScreenProps<
  RootStackScreenParamsList,
  RootStackScreen.LOGIN_SUCCESSFUL
>;

export const SignInSuccessfulScreen = ({
  navigation,
}: SignInSuccessfulProps): JSX.Element => {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );
  const I18n = languageService.useTranslation();
  const styles = useEStyles({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    footer: {
      position: 'absolute',
      bottom: '$spacer6',
      right: '$spacer6',
      left: '$spacer6',
    },
    header: {
      position: 'absolute',
      top: '$spacer6',
      right: '$spacer6',
      left: '$spacer6',
    },
    content: {
      flex: 1,
      padding: '$spacer6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: '$secondaryColor',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    subtitle: {
      color: '$secondaryColor',
      textAlign: 'center',
    },
    successLogo: {},
  });

  const handleNextStep = async () => {
    navigation.replace(RootStackScreen.FIRST_STEP);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Logo />
      </View>
      <View style={styles.content}>
        <Image style={styles.successLogo as ImageStyle} source={successLogo} />
        <Text style={styles.title}>
          {I18n.t('screen.SignInSuccessfulScreen.title')}
        </Text>
        <Text style={styles.subtitle}>
          {I18n.t('screen.SignInSuccessfulScreen.subtitle')}
        </Text>
      </View>
      <View style={styles.footer}>
        <LueurButton onPress={handleNextStep} content={I18n.t('common.next')} />
      </View>
    </SafeAreaView>
  );
};
