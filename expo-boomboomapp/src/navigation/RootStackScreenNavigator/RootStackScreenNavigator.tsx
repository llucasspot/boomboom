import React from 'react';
import RootStack, {RootStackScreen} from './RootStack';
import AuthScreen from '../../screens/AuthScreen';
import SplashScreen from '../../screens/steps/SplashScreen';
import {OauthViewScreen} from '../../screens/OauthViewScreen';
import {SignInSuccessfulScreen} from '../../screens/SignInSuccessfulScreen';
import {UploadProfilePictureScreen} from '../../screens/steps/UploadProfilePictureScreen';
import {SetUserDetailScreen} from '../../screens/steps/SetUserDetailScreen';
import {AddFavoriteSongScreen} from '../../screens/steps/AddFavoriteSongScreen';
import {WelcomeScreen} from '../../screens/WelcomeScreen';
import {getGlobalInstance} from '../../tsyringe/diUtils';
import ErrorService from '../../services/ErrorService/ErrorService';
import ServiceInterface from '../../tsyringe/ServiceInterface';
import {HomeScreen} from '../../screens/HomeScreen';

const RootStackScreenNavigator = (): JSX.Element => {
  const errorService = getGlobalInstance<ErrorService>(
    ServiceInterface.ErrorService,
  );

  errorService.useListenError();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen
        name={RootStackScreen.SPLASH}
        component={SplashScreen}
      />
      <RootStack.Group>
        <RootStack.Screen
          name={RootStackScreen.AUTH_HOME}
          component={AuthScreen}
        />
        <RootStack.Screen
          name={RootStackScreen.OAUTH_SCREEN}
          component={OauthViewScreen}
        />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen
          name={RootStackScreen.WELCOME_SCREEN}
          component={WelcomeScreen}
        />
        <RootStack.Screen name={RootStackScreen.HOME} component={HomeScreen} />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen
          name={RootStackScreen.LOGIN_SUCCESSFUL}
          component={SignInSuccessfulScreen}
        />
        <RootStack.Screen
          name={RootStackScreen.FIRST_STEP}
          component={UploadProfilePictureScreen}
        />
        <RootStack.Screen
          name={RootStackScreen.SECOND_STEP}
          component={SetUserDetailScreen}
        />
        <RootStack.Screen
          name={RootStackScreen.THIRD_STEP}
          component={AddFavoriteSongScreen}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
export default RootStackScreenNavigator;
