import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Header } from "./Header";
import { SafeView } from "./SafeView";

import useEStyles from "#hooks/useEStyles";

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
  const styles = useEStyles({
    content: {
      paddingTop: shouldSkipMargins ? 0 : "$spacer5",
    },
  });

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
