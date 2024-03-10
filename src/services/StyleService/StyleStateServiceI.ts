export type StyleState = {
  remBase: number;
  backgroundColor: string;
  fontColor: string;
  primaryColor: string;
  onPrimaryColor: string;
  secondaryColor: string;
  onSecondaryColor: string;
  successColor: string;
  errorColor: string;
};

export const COLORS = {
  PINK: "#ED2272",
  DARK_BLUE: "#2F215F",
};

export type ThemeConfig = Omit<StyleState, "remBase">;
export const themeConfigs: Record<Theme, ThemeConfig> = {
  DARK: {
    backgroundColor: "#15131E",
    fontColor: "#F3F0F5",
    primaryColor: COLORS.PINK,
    secondaryColor: "#F3F0F5",
    onPrimaryColor: COLORS.PINK,
    onSecondaryColor: COLORS.DARK_BLUE,
    successColor: "#23C766",
    errorColor: "#EF4B56",
  },
  LIGHT: {
    backgroundColor: "#FFFFFF",
    fontColor: "#5E5D71",
    primaryColor: COLORS.PINK,
    secondaryColor: COLORS.DARK_BLUE,
    onPrimaryColor: "white",
    onSecondaryColor: "white",
    successColor: "#23C766",
    errorColor: "#EF4B56",
  },
};

export enum Theme {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

export const DEFAULT_THEME: Theme = Theme.LIGHT;

export const DEFAULT_STYLE_STATE: StyleState = {
  remBase: 16,
  backgroundColor: themeConfigs[DEFAULT_THEME].backgroundColor,
  fontColor: themeConfigs[DEFAULT_THEME].fontColor,
  primaryColor: themeConfigs[DEFAULT_THEME].primaryColor,
  secondaryColor: themeConfigs[DEFAULT_THEME].secondaryColor,
  onPrimaryColor: themeConfigs[DEFAULT_THEME].onPrimaryColor,
  onSecondaryColor: themeConfigs[DEFAULT_THEME].onSecondaryColor,
  successColor: themeConfigs[DEFAULT_THEME].successColor,
  errorColor: themeConfigs[DEFAULT_THEME].errorColor,
};
