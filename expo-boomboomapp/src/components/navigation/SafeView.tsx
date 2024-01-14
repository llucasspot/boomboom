import React, { type PropsWithChildren } from "react";
import {
  type NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";
import useEStyles from "../../hooks/useEStyles";

type SafeViewProps = NativeSafeAreaViewProps;

const SafeView = ({
  children,
  style,
  ...props
}: PropsWithChildren<SafeViewProps>) => {
  const styles = useEStyles({
    wrapper: {
      flex: 1,
    },
  });
  return (
    <SafeAreaView
      {...props}
      style={{
        ...styles.wrapper,
        ...(style as object),
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export { SafeView };
