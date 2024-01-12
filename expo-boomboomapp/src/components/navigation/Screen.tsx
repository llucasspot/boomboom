import React, { type PropsWithChildren } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Edge } from "react-native-safe-area-context";

import { Header } from "./Header";
import { SafeView } from "./SafeView";
import { View } from "../../../components/Themed";
import useEStyles from "../../hooks/useEStyles";

type ScreenProps = {
  edges?: Edge[];
  title?: string | null;
  goBack?: boolean;
  shouldSkipMargins?: boolean;
  isScrollable?: boolean;
  onGoBack?: () => void;
};

const Screen = ({
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

  const Content = <View style={styles.content}>{children}</View>;

  return (
    <SafeView edges={edges}>
      <Header title={title} goBack={goBack} onGoBack={onGoBack} />

      {isScrollable ? (
        <KeyboardAwareScrollView>{Content}</KeyboardAwareScrollView>
      ) : (
        <>{Content}</>
      )}
    </SafeView>
  );
};

export { Screen };
