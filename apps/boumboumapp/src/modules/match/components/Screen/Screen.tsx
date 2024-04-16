import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { SafeView } from "./components/SafeView";

import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { Header } from "#modules/match/components/Header/Header";

type ScreenProps = {
  title?: string | null;
  goBack?: boolean;
  shouldSkipMargins?: boolean;
  isScrollable?: boolean;
  onGoBack?: () => void;
} & React.ComponentProps<typeof SafeView>;

export const Screen = ({
  children,
  title,
  goBack,
  shouldSkipMargins = false,
  isScrollable = true,
  onGoBack,
  ...props
}: PropsWithChildren<ScreenProps>) => {
  const styles = useAppThemeStyle((appTheme) =>
    createStyleSheet({
      content: {
        paddingTop: shouldSkipMargins ? 0 : appTheme.spacers.spacer5,
      },
    }),
  );

  const content = <View style={styles.content}>{children}</View>;

  return (
    <SafeView {...props}>
      <Header title={title} goBack={goBack} onGoBack={onGoBack} />

      {isScrollable ? (
        <KeyboardAwareScrollView>{content}</KeyboardAwareScrollView>
      ) : (
        <>{content}</>
      )}
    </SafeView>
  );
};
