import React, { type PropsWithChildren } from "react";
import {
  type NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";

import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";

type SafeViewProps = NativeSafeAreaViewProps;

export const SafeView = ({
  children,
  style,
  ...props
}: PropsWithChildren<SafeViewProps>) => {
  const styles = useAppThemeStyle((appTheme) =>
    createStyleSheet({
      wrapper: {
        flex: 1,
      },
    }),
  );
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
