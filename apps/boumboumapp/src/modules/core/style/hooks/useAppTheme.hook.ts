import { useTheme } from "react-native-paper";

import { AppTheme } from "#modules/core/style/themes/beans/theme";

export const useAppTheme = () => useTheme<AppTheme>();
