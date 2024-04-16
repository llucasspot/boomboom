import { useMemo } from "react";

import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";

export const useAppThemeStyle = <T>(
  styleMakerFunction: (appTheme: AppTheme) => T,
) => {
  const appTheme = useAppTheme();
  return useMemo(() => {
    return styleMakerFunction(appTheme);
  }, [appTheme]);
};
