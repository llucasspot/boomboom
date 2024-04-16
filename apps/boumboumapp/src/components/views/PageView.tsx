import { View } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context/src/SafeAreaView";

import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";

export function PageView({ style, ...props }: SafeAreaViewProps): JSX.Element {
  const styles = useAppThemeStyle(makeStyles);

  return <View style={[style, styles.mainContainer]} {...props} />;
}

const makeStyles = (appTheme: AppTheme) =>
  createStyleSheet({
    mainContainer: {
      flex: 1,
      backgroundColor: appTheme.colors.background,
    },
  });
