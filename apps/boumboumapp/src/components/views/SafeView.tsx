import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaViewProps } from "react-native-safe-area-context/src/SafeAreaView";

import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";

export function SafeView({ style, ...props }: SafeAreaViewProps): JSX.Element {
  const styles = useAppThemeStyle(makeStyles);

  return <SafeAreaView style={[styles.mainContainer, style]} {...props} />;
}

const makeStyles = (appTheme: AppTheme) =>
  createStyleSheet({
    mainContainer: {
      flex: 1,
    },
  });
