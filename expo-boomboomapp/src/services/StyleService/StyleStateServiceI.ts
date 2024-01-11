export type StyleState = {
  remBase: number;
  backgroundColor: string;
  fontColor: string;
  primaryColor: string;
  secondaryColor: string;
  successColor: string;
  errorColor: string;
};

export const COLORS = {
  PINK: "#ED2272",
  DARK_BLUE: "#2F215F",
};

export type ThemeConfig = [string, string, string, string, string, string];
export const themeConfigs: Record<Theme, ThemeConfig> = {
  /*
    THEME_NAME: [
      '$backgroundColor',
      '$fontColor',
      '$primaryColor',
      '$secondaryColor',
      '$successColor',
      '$errorColor'
    ]
    */
  DARK: ["#15131E", "#F3F0F5", COLORS.PINK, "#F3F0F5", "#23C766", "#EF4B56"],
  LIGHT: [
    "#FFFFFF",
    "#5E5D71",
    COLORS.PINK,
    COLORS.DARK_BLUE,
    "#23C766",
    "#EF4B56",
  ],
};

export enum Theme {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

export const DEFAULT_THEME: Theme = Theme.LIGHT;

export const DEFAULT_STYLE_STATE: StyleState = {
  remBase: 16,
  backgroundColor: themeConfigs[DEFAULT_THEME][0],
  fontColor: themeConfigs[DEFAULT_THEME][1],
  primaryColor: themeConfigs[DEFAULT_THEME][2],
  secondaryColor: themeConfigs[DEFAULT_THEME][3],
  successColor: themeConfigs[DEFAULT_THEME][4],
  errorColor: themeConfigs[DEFAULT_THEME][5],
};
