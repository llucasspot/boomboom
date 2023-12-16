/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreenNavigator from './src/navigation/RootStackScreenNavigator/RootStackScreenNavigator';
import 'reflect-metadata';
import './src/tsyringe/tsyringe.config';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const barStyle = isDarkMode ? 'dark-content' : 'light-content';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <RootStackScreenNavigator />
    </NavigationContainer>
  );
}

export default App;
