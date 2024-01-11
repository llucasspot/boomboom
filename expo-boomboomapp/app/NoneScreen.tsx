import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LanguageService from "../src/services/LanguageService/LanguageService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import { getGlobalInstance } from "../src/tsyringe/diUtils";

export default function NoneScreen(): JSX.Element {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );
  const I18n = languageService.useTranslation();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text style={styles.text}>{I18n.t("common.toImplement")}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cb5353",
  },
  text: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
});
