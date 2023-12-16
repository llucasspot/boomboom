import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
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
import {LogoVertical} from '../components/LogoVertical';

type WelcomeScreenProps = NativeStackScreenProps<
  RootStackScreenParamsList,
  RootStackScreen.WELCOME_SCREEN
>;

export const WelcomeScreen = ({
  navigation,
}: WelcomeScreenProps): JSX.Element => {
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
      marginHorizontal: '$spacer6',
      marginVertical: '$spacer6',
    },
    header: {
      marginHorizontal: '$spacer6',
      marginVertical: '$spacer6',
    },
    content: {
      flex: 1,
      paddingHorizontal: '$spacer6',
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
  });

  const handleNextStep = async () => {
    navigation.reset({
      index: 0,
      routes: [{name: RootStackScreen.HOME}],
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <LogoVertical />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{I18n.t('screen.WelcomeScreen.title')}</Text>
        <Text style={styles.subtitle}>
          {I18n.t('screen.WelcomeScreen.subtitle')}
        </Text>
      </View>
      <View style={styles.footer}>
        <LueurButton onPress={handleNextStep} content={I18n.t('common.next')} />
      </View>
    </SafeAreaView>
  );
};
