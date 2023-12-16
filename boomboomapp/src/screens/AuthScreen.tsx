import React from 'react';
import {Image, ImageStyle, SafeAreaView, Text, View} from 'react-native';
import {getGlobalInstance} from '../tsyringe/diUtils';
import ServiceInterface from '../tsyringe/ServiceInterface';
import LanguageService from '../services/LanguageService/LanguageService';
import useEStyles from '../hooks/useEStyles';
import {BaseButtonIconPosition} from '../components/Buttons/BaseButton';
import {IconName} from '../components/Icons/IconName';
import {LueurButton} from '../components/Buttons/LueurButton';
import girlBackground from '../assets/girl.png';
import {
  RootStackScreen,
  RootStackScreenParamsList,
} from '../navigation/RootStackScreenNavigator/RootStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Logo} from '../components/Logo';

type AuthScreenProps = NativeStackScreenProps<
  RootStackScreenParamsList,
  RootStackScreen.AUTH_HOME
>;

const AuthScreen = ({navigation}: AuthScreenProps): JSX.Element => {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );
  const I18n = languageService.useTranslation();
  const styles = useEStyles({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    logoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    girlBackground: {
      top: 0,
    },
    logoImageText: {
      width: '3rem',
      height: '3rem',
      marginRight: '$spacer4',
    },
    contentContainer: {
      position: 'absolute',
      bottom: '$spacer6',
      right: '$spacer6',
      left: '$spacer6',
    },
    text: {
      color: '$secondaryColor',
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: '$spacer5',
    },
    button: {},
  });

  const authenticate = async () => {
    navigation.navigate(RootStackScreen.OAUTH_SCREEN);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image
        style={styles.girlBackground as ImageStyle}
        source={girlBackground}
      />
      <View style={styles.contentContainer}>
        <Logo />
        <Text style={styles.text}>{I18n.t('screen.SignInScreen.title')}</Text>
        <LueurButton
          onPress={authenticate}
          style={styles.button}
          iconPosition={BaseButtonIconPosition.LEFT}
          icon={IconName.SPOTIFY}
          content={I18n.t('screen.SignInScreen.spotifySignInButtonLabel')}
        />
      </View>
    </SafeAreaView>
  );
};
export default AuthScreen;
