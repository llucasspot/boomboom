import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  RootStackScreen,
  RootStackScreenParamsList,
} from '../../navigation/RootStackScreenNavigator/RootStack';
import ErrorService from '../../services/ErrorService/ErrorService';
import {getGlobalInstance} from '../../tsyringe/diUtils';
import ServiceInterface from '../../tsyringe/ServiceInterface';
import AuthService from '../../services/AuthService/AuthService';
import useEStyles from '../../hooks/useEStyles';
import {SvgXml} from 'react-native-svg';
import boomboomText from '../../assets/logo_text.svg';
import ConfigurationService from '../../services/ConfigurationService/ConfigurationService';

type SplashScreenProps = {} & NativeStackScreenProps<
  RootStackScreenParamsList,
  RootStackScreen.SPLASH
>;

const SplashScreen = ({navigation}: SplashScreenProps): JSX.Element => {
  const authService = getGlobalInstance<AuthService>(
    ServiceInterface.AuthService,
  );
  const errorService = getGlobalInstance<ErrorService>(
    ServiceInterface.ErrorService,
  );
  const configurationService = getGlobalInstance<ConfigurationService>(
    ServiceInterface.ConfigurationService,
  );

  const styles = useEStyles({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '$primaryColor',
    },
    content: {
      // flex: 1,
      color: 'white',
      fontSize: 50,
      fontWeight: 'bold',
    },
    background: {
      ...(StyleSheet.absoluteFill as object),
      height: '100%',
      width: '100%',
    },
  });

  useEffect(() => {
    authService
      .initialiseApplication()
      .then(() => {
        if (
          authService.isUserConnected() ||
          configurationService.byPassSignInScreen()
        ) {
          setTimeout(() => {
            navigation.replace(RootStackScreen.LOGIN_SUCCESSFUL);
          }, 2000);
          return;
        }
        setTimeout(() => {
          navigation.replace(RootStackScreen.AUTH_HOME);
        }, 2000);
      })
      // TODO handle error
      .catch(console.log);
  }, [authService, errorService, navigation]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SvgXml height={32} xml={boomboomText} />
    </SafeAreaView>
  );
};

export default SplashScreen;
