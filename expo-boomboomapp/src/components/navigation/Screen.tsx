import React, { type PropsWithChildren } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "./Header";
import { SafeView } from "./SafeView";
import { View } from "../../../components/Themed";
import useEStyles from "../../hooks/useEStyles";
import {NativeSafeAreaViewProps} from "react-native-safe-area-context/src/SafeArea.types";

type ScreenProps = {
  edges?: NativeSafeAreaViewProps['edges'];
  title?: string | null;
  goBack?: boolean;
  shouldSkipMargins?: boolean;
  isScrollable?: boolean;
  onGoBack?: () => void;
};

export const Screen = ({
  children,
  edges,
  title,
  goBack,
  shouldSkipMargins = false,
  isScrollable = true,
  onGoBack,
}: PropsWithChildren<ScreenProps>) => {
  const styles = useEStyles({
    content: {
      paddingTop: shouldSkipMargins ? 0 : "$spacer5",
    },
  });

  const content = <View style={styles.content}>{children}</View>;

  return (
    <SafeView edges={edges}>
      <Header title={title} goBack={goBack} onGoBack={onGoBack} />

      {isScrollable ? (
        <KeyboardAwareScrollView>{content}</KeyboardAwareScrollView>
      ) : (
        <>{content}</>
      )}
    </SafeView>
  );
};
