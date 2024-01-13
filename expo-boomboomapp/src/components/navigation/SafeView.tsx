import React, { type PropsWithChildren } from "react";
import {
  type NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";
import useEStyles from "../../hooks/useEStyles";

type SafeViewProps = NativeSafeAreaViewProps;

const SafeView = ({ children, edges }: PropsWithChildren<SafeViewProps>) => {
  const styles = useEStyles({
    wrapper: {
      flex: 1,
    },
  });
  return (
    <SafeAreaView edges={edges} style={styles.wrapper}>
      {children}
    </SafeAreaView>
  );
};

export { SafeView };
