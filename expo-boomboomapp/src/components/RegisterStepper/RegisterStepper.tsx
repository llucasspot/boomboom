import { NavigationProp } from "@react-navigation/core/src/types";
import {
  createNavigationContainerRef,
  EventArg,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { ReactNode, useRef, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LueurButton } from "../Buttons/LueurButton";
import { Progressheader } from "../Progressheader";

import useEStyles from "#hooks/useEStyles";
import LanguageService from "#services/LanguageService/LanguageService";
import { useCoreStyles } from "#services/StyleService/styles";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { getGlobalInstance } from "#tsyringe/diUtils";

export type StepProps<T extends object> = {
  setStepperLayoutCallback: (
    cb: (props: { navigateOnNextStep: () => void }) => void,
  ) => void;
  setDisableSubmit: (enable: boolean) => void;
  navigation: NavigationProp<T>;
};

type ChildType<T extends object> = (props: StepProps<T>) => ReactNode;

type StepScreenProps<T extends object> = {
  contentStyle?: ViewStyle;
  children: ChildType<T>[];
  navigation: NavigationProp<T>;
};

type RegistrationStackScreenParamsList = Record<string, { index: number }>;

const RegisterStepperStack =
  createNativeStackNavigator<RegistrationStackScreenParamsList>();

export function RegisterStepper<T extends object>({
  children,
  navigation,
}: StepScreenProps<T>): JSX.Element {
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );
  const I18n = languageService.useTranslation();
  const nestedNavigationRef =
    createNavigationContainerRef<RegistrationStackScreenParamsList>();
  const [step, setStep] = useState<number>(0);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);

  const stepperLayoutCallback = useRef({
    value: (props: { navigateOnNextStep: () => void }) => {},
  });

  const setStepperLayoutCallback = (
    cb: (props: { navigateOnNextStep: () => void }) => Promise<void> | void,
  ) => {
    stepperLayoutCallback.current.value = cb;
  };

  const numberOfStep = children.length;

  const navigateOnNextStep = () => {
    const nextStep = step + 1;
    // @ts-ignore TODO to see
    nestedNavigationRef.navigate(nextStep.toString());
  };

  const onContinue = async () => {
    await stepperLayoutCallback.current.value({ navigateOnNextStep });
  };

  const isLastStep = step === numberOfStep - 1;
  const progress = step / (numberOfStep - 1);

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
    },
    title: {
      color: "$secondaryColor",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    stepTitle: {
      marginBottom: "0.8rem",
    },
    navigationContainer: {
      backgroundColor: "$backgroundColor",
    },
  });

  function onPressBack() {
    nestedNavigationRef.goBack();
  }

  const Header = () => {
    return (
      <View style={styles.header}>
        <Progressheader onPressBack={onPressBack} progress={progress} />
        <View>
          <Text style={{ ...coreStyles.P, ...styles.stepTitle }}>
            {I18n.t("common.stepperHeader", { step: step + 1, numberOfStep })}
          </Text>
          <Text style={{ ...coreStyles.H2 }}>
            {I18n.t(`component.RegisterStepper.step.${step}.title`)}
          </Text>
        </View>
      </View>
    );
  };

  const Footer = () => {
    return (
      <View style={styles.footer}>
        <LueurButton
          disabled={disableSubmit}
          onPress={onContinue}
          content={isLastStep ? I18n.t("common.over") : I18n.t("common.next")}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header />
      <NavigationContainer
        independent
        theme={{
          // TODO to see
          // @ts-ignore
          colors: {
            background: styles.navigationContainer.backgroundColor as string,
          },
        }}
        ref={nestedNavigationRef}
      >
        <RegisterStepperStack.Navigator
          screenOptions={{ headerShown: false }}
          screenListeners={{
            // @ts-ignore TODO to see
            state: (
              e: EventArg<"state", false, RegistrationStackScreenParamsList>,
            ) => {
              setStep(e.data?.state.index);
            },
          }}
        >
          {children.map((Child, childIndex) => {
            return (
              <RegisterStepperStack.Screen
                name={childIndex.toString()}
                key={childIndex.toString()}
              >
                {(props) => {
                  return (
                    <View style={styles.content}>
                      <Child
                        navigation={navigation}
                        setStepperLayoutCallback={setStepperLayoutCallback}
                        setDisableSubmit={setDisableSubmit}
                      />
                    </View>
                  );
                }}
              </RegisterStepperStack.Screen>
            );
          })}
        </RegisterStepperStack.Navigator>
      </NavigationContainer>
      <Footer />
    </SafeAreaView>
  );
}
