import { PropsWithChildren } from "react";
import { Provider } from "react-native-paper";

import { darkPaperTheme } from "#modules/core/style/themes/dark.theme";
import { lightPaperTheme } from "#modules/core/style/themes/light.theme";

type PaperProviderProps = PropsWithChildren<{ isColorSchemeDark: boolean }>;

export function StyleProvider({
  children,
  isColorSchemeDark,
}: PaperProviderProps) {
  const paperTheme = isColorSchemeDark ? darkPaperTheme : lightPaperTheme;
  return <Provider theme={paperTheme}>{children}</Provider>;
}
