import {
  createNavigationContainerRef,
  EventArg,
  NavigationContainer,
  NavigationContainerRefWithCurrent,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React, { ReactNode, useEffect, useRef } from "react";
import { View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LueurButton } from "#components/lueurs/LueurButton";
import { BaseText } from "#components/texts/BaseText";
import { diService } from "#modules/core/di/di-utils";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";
import {
  RegisterStackParamsList,
  RegisterStackScreen,
} from "#modules/registration/Register.stack";
import { ProgressHeader } from "#modules/registration/components/ProgressHeader";
import { RegistrationStateManager } from "#modules/registration/services/RegistrationState.manager";

export type StepProps = {
  stateManager: RegistrationStateManager;
  setStepperLayoutCallback: (cb: (props: object) => void) => void;
  rootNavigation: NativeStackNavigationProp<
    RegisterStackParamsList,
    RegisterStackScreen.REGISTRATION_SCREEN,
    undefined
  >;
  stepperNavigation: NativeStackNavigationProp<RegistrationStackScreenParamsList>;
};

type ChildType = (props: StepProps) => ReactNode;

type StepScreenProps = {
  contentStyle?: ViewStyle;
  children: ChildType[];
  rootNavigation: NativeStackNavigationProp<
    RegisterStackParamsList,
    RegisterStackScreen.REGISTRATION_SCREEN,
    undefined
  >;
};

type RegistrationStackScreenParamsList = Record<string, { index: number }>;

const RegisterStepperStack =
  createNativeStackNavigator<RegistrationStackScreenParamsList>();

export function RegisterStepper({
  children,
  rootNavigation,
}: StepScreenProps): JSX.Element {
  const registrationStateService = diService.getInstance(
    RegistrationStateManager,
  );
  const stepperState = registrationStateService.useStepperState();

  const nestedNavigationRef =
    createNavigationContainerRef<RegistrationStackScreenParamsList>();

  const styles = useAppThemeStyle(makeStyles);

  const stepperLayoutCallback = useRef({
    value: (props: object) => {},
  });

  useEffect(() => {
    registrationStateService.initState(children.length);
  }, []);

  const setStepperLayoutCallback = (
    cb: (props: object) => Promise<void> | void,
  ) => {
    stepperLayoutCallback.current.value = cb;
  };

  const onContinue = async () => {
    await stepperLayoutCallback.current.value({});
  };

  const Footer = () => {
    return (
      <View style={styles.footer}>
        <LueurButton
          disabled={stepperState.isSubmitDisabled}
          onPress={onContinue}
          content={
            registrationStateService.isLastStep()
              ? "common.over"
              : "common.next"
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavigationContainer
        independent
        theme={{
          // TODO to see
          // @ts-ignore NavigationContainer theme
          colors: {
            background: styles.navigationContainer.backgroundColor as string,
          },
        }}
        ref={nestedNavigationRef}
      >
        <Header navigation={nestedNavigationRef} />
        <RegisterStepperStack.Navigator
          screenOptions={{ headerShown: false }}
          screenListeners={{
            state: (
              e: EventArg<"state", false, RegistrationStackScreenParamsList>,
            ) => {
              registrationStateService.updateStepperState({
                step: e.data.state.index,
              });
            },
          }}
        >
          {children.map((Child, childIndex) => {
            return (
              <RegisterStepperStack.Screen
                name={childIndex.toString()}
                key={childIndex.toString()}
              >
                {({ navigation }) => {
                  return (
                    <View style={styles.content}>
                      <Child
                        stateManager={registrationStateService}
                        stepperNavigation={navigation}
                        rootNavigation={rootNavigation}
                        setStepperLayoutCallback={setStepperLayoutCallback}
                      />
                    </View>
                  );
                }}
              </RegisterStepperStack.Screen>
            );
          })}
        </RegisterStepperStack.Navigator>
        <Footer />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const Header = ({
  navigation,
}: {
  navigation: NavigationContainerRefWithCurrent<RegistrationStackScreenParamsList>;
}) => {
  const registrationStateService = diService.getInstance(
    RegistrationStateManager,
  );
  const stepperState = registrationStateService.useStepperState();

  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;
  const styles = useAppThemeStyle(makeStyles);

  function onPressBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.header}>
      <ProgressHeader
        onPressBack={onPressBack}
        progress={registrationStateService.getProgression()}
      />
      <View>
        <BaseText
          i18nKey="common.stepperHeader"
          i18nOptions={{
            step: stepperState.step + 1,
            numberOfStep: stepperState.numberOfSteps,
          }}
          style={[tagStyles.p, styles.stepTitle]}
        />

        <BaseText
          i18nKey={`component.RegisterStepper.step.${stepperState.step}.title`}
          style={[tagStyles.h2]}
        />
      </View>
    </View>
  );
};

const makeStyles = (appTheme: AppTheme) =>
  createStyleSheet({
    mainContainer: {
      flex: 1,
      backgroundColor: appTheme.colors.background,
    },
    footer: {
      marginHorizontal: appTheme.spacers.spacer6,
      marginVertical: appTheme.spacers.spacer6,
    },
    header: {
      marginHorizontal: appTheme.spacers.spacer6,
      marginVertical: appTheme.spacers.spacer6,
    },
    content: {
      flex: 1,
      paddingHorizontal: appTheme.spacers.spacer6,
    },
    title: {
      color: appTheme.colors.onSecondaryContainer,
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    stepTitle: {
      marginBottom: "0.8rem",
    },
    navigationContainer: {
      backgroundColor: appTheme.colors.background,
    },
  });
