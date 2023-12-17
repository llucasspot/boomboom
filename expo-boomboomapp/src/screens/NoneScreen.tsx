import React from 'react';
// import { useTranslation } from 'react-i18next';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {getGlobalInstance} from '../tsyringe/diUtils';
import ServiceInterface from '../tsyringe/ServiceInterface';
import LanguageService from '../services/LanguageService/LanguageService';

const NoneScreen = (): JSX.Element => {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );
  const I18n = languageService.useTranslation();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text style={styles.text}>{I18n.t('common.toImplement')}</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cb5353',
  },
  text: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
});
export default NoneScreen;
