import React, { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LueurButton } from "./Buttons/LueurButton";
import { Logo } from "./Logo";
import useEStyles from "../hooks/useEStyles";
import LanguageService from "../services/LanguageService/LanguageService";
import ServiceInterface from "../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../tsyringe/diUtils";

type StepScreenProps = PropsWithChildren<{
  contentStyle?: ViewStyle;
  handleNextStep: () => void | Promise<void>;
  stepNumber: number;
  numberOfStep?: number;
}>;

export const StepScreenLayout = ({
  contentStyle = {},
  children,
  handleNextStep,
  stepNumber,
  numberOfStep = 3,
}: StepScreenProps): JSX.Element => {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );
  const I18n = languageService.useTranslation();
  const styles = useEStyles({
    mainContainer: {
      flex: 1,
      backgroundColor: "$backgroundColor",
    },
    footer: {
      marginHorizontal: "$spacer6",
      marginVertical: "$spacer6",
    },
    header: {
      marginHorizontal: "$spacer6",
      marginVertical: "$spacer6",
    },
    content: {
      flex: 1,
      paddingHorizontal: "$spacer6",
      ...contentStyle,
    },
    title: {
      color: "$secondaryColor",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
  });

  const isLastStep = stepNumber === numberOfStep;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Logo />
      </View>
      <View style={styles.content}>{children}</View>
      <View style={styles.footer}>
        <LueurButton
          onPress={handleNextStep}
          content={isLastStep ? I18n.t("common.over") : I18n.t("common.next")}
        />
      </View>
    </SafeAreaView>
  );
};
