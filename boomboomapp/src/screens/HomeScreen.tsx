import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {getGlobalInstance} from '../tsyringe/diUtils';
import ServiceInterface from '../tsyringe/ServiceInterface';
import LanguageService from '../services/LanguageService/LanguageService';
import useEStyles from '../hooks/useEStyles';
import {
  RootStackScreen,
  RootStackScreenParamsList,
} from '../navigation/RootStackScreenNavigator/RootStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BaseButton, {BaseButtonTheme} from '../components/Buttons/BaseButton';
import {IconName} from '../components/Icons/IconName';

type HomeScreenProps = NativeStackScreenProps<
  RootStackScreenParamsList,
  RootStackScreen.HOME
>;

export const HomeScreen = ({}: HomeScreenProps): JSX.Element => {
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
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: '$spacer6',
      marginVertical: '$spacer6',
    },
    footerButton: {
      marginHorizontal: '$spacer1',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <BaseButton
          color={'$secondaryColor'}
          theme={BaseButtonTheme.OUTLINED}
          content={I18n.t('common.profile')}
        />
        <BaseButton
          color={'$secondaryColor'}
          theme={BaseButtonTheme.OUTLINED}
          content={I18n.t('common.matches')}
        />
      </View>
      <View style={styles.content}>
        <Text>{I18n.t('common.toImplement')}</Text>
      </View>
      <View style={styles.footer}>
        <BaseButton
          icon={IconName.X_CROSS}
          color={'$secondaryColor'}
          theme={BaseButtonTheme.OUTLINED}
          style={styles.footerButton}
        />
        <BaseButton
          icon={IconName.RED_HEART}
          color={'$secondaryColor'}
          theme={BaseButtonTheme.OUTLINED}
          style={styles.footerButton}
        />
      </View>
    </SafeAreaView>
  );
};
