import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import React, { ReactNode, useRef, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LueurButton } from "./Buttons/LueurButton";
import { Progressheader } from "./Progressheader";
import useEStyles from "../hooks/useEStyles";
import {
  RegistrationStack,
  RegistrationStackScreenParamsList,
} from "../navigation/RegistrationStack/RegistrationStack";
import LanguageService from "../services/LanguageService/LanguageService";
import { useCoreStyles } from "../services/StyleService/styles";
import ServiceInterface from "../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../tsyringe/diUtils";

export type StepProps = {
  setStepperLayoutCallback: (cb: () => void) => void;
};

type ChildType = (props: StepProps) => ReactNode;

type StepScreenProps = {
  contentStyle?: ViewStyle;
  children: ChildType[];
};

export function ScreenStepperLayout({
  contentStyle = {},
  children,
}: StepScreenProps): JSX.Element {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI
  );
  const I18n = languageService.useTranslation();
  const nestedNavigationRef =
    createNavigationContainerRef<RegistrationStackScreenParamsList>();
  const [step, setStep] = useState<number>(0);

  const stepperLayoutCallback = useRef({
    value: () => {},
  });

  const resetStepperLayoutCallback = () => {
    setStepperLayoutCallback(() => {});
  };

  const setStepperLayoutCallback = (cb: () => Promise<void> | void) => {
    stepperLayoutCallback.current.value = cb;
  };

  const numberOfStep = children.length;

  const navigateOnNextStep = () => {
    const nextStep = step + 1;
    nestedNavigationRef.navigate(nextStep.toString());
  };

  const onContinue = async () => {
    await stepperLayoutCallback.current.value();
    resetStepperLayoutCallback();
    if (isLastStep) {
      return;
    }
    navigateOnNextStep();
  };

  const isLastStep = step + 1 === numberOfStep;
  const progress = (step + 1) / numberOfStep;

  const coreStyles = useCoreStyles();
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
    stepTitle: {
      marginBottom: "0.8rem",
    },
  });

  function onPressBack() {
    nestedNavigationRef.goBack();
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Progressheader onPressBack={onPressBack} progress={progress} />
        <View>
          <Text style={{ ...coreStyles.P, ...styles.stepTitle }}>
            {I18n.t("common.stepperHeader", { step: step + 1, numberOfStep })}
          </Text>
          <Text style={{ ...coreStyles.H2 }}>Upload profile picture</Text>
        </View>
      </View>
      <NavigationContainer
        independent
        theme={{
          // TODO to see
          // @ts-ignore
          colors: {
            background: "white",
          },
        }}
        ref={nestedNavigationRef}
      >
        <RegistrationStack.Navigator
          screenOptions={{ headerShown: false }}
          screenListeners={{
            state: (e) => {
              // TODO to see
              // @ts-ignore
              setStep(e.data.state.index);
            },
          }}
        >
          {children.map((Child, childIndex) => {
            return (
              <RegistrationStack.Screen
                name={childIndex.toString()}
                key={childIndex.toString()}
              >
                {(props) => {
                  return (
                    <View style={styles.content}>
                      <Child
                        setStepperLayoutCallback={setStepperLayoutCallback}
                      />
                    </View>
                  );
                }}
              </RegistrationStack.Screen>
            );
          })}
        </RegistrationStack.Navigator>
      </NavigationContainer>
      <View style={styles.footer}>
        <LueurButton
          onPress={onContinue}
          content={isLastStep ? I18n.t("common.over") : I18n.t("common.next")}
        />
      </View>
    </SafeAreaView>
  );
}
