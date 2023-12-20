import {observable, useObservable} from 'micro-observables';
import EStyleSheet from 'react-native-extended-stylesheet';
import {inject, singleton} from 'tsyringe';
import {
  DEFAULT_STYLE_STATE,
  DEFAULT_THEME,
  StyleState,
  Theme,
  ThemeConfig,
  themeConfigs,
} from './StyleStateServiceI';
import ServiceInterface from '../../tsyringe/ServiceInterface';
import StorageService from '../StorageService/StorageService';
import {Dimensions} from 'react-native';
import {borderRadius, colors, elevations, fontSizes, fontWeights, spacers} from "./styleVariable";

@singleton()
export default class StyleService {
  private _style = observable<StyleState>(DEFAULT_STYLE_STATE);
  readonly style = this._style.readOnly();
  private _theme = observable<Theme>(DEFAULT_THEME);
  readonly theme = this._theme.readOnly();

  constructor(
    @inject(ServiceInterface.StorageServiceI)
    private storageService: StorageService,
  ) {}

  async initialiseService(isDarkMode: boolean) {
    const {width} = Dimensions.get('window');
    this.update({
      // TODO responsive : rem : a etudier les tailles des bases
      remBase: width > 340 ? 18 : 16,
    });
    await this.updateTheme(isDarkMode ? Theme.DARK : Theme.LIGHT);
  }

  useStyle(): StyleState {
    return ((): StyleState => useObservable(this.style))();
  }

  useTheme(): Theme {
    return ((): Theme => useObservable(this.theme))();
  }

  update(properties: Partial<StyleState>): void {
    this._style.update(oldStyle => {
      const newStyle = {
        ...oldStyle,
        ...properties,
      };
      // always call EStyleSheet.build() even if you don't use global variables!
      EStyleSheet.build({
        $rem: newStyle.remBase,
        ...colors(newStyle),
        ...borderRadius,
        ...fontSizes,
        ...spacers,
        ...fontWeights,
        ...elevations,
      });

      return newStyle;
    });
  }

  getThemeColors(theme: Theme): ThemeConfig {
    return this.getThemeConfig()[theme];
  }

  getThemeConfig(): {[key in Theme]: ThemeConfig} {
    return themeConfigs;
  }

  async updateTheme(theme: Theme): Promise<void> {
    this._theme.update(() => {
      return theme;
    });
    const themeColors = this.getThemeColors(theme);
    this.update({
      backgroundColor: themeColors[0],
      fontColor: themeColors[1],
      primaryColor: themeColors[2],
      secondaryColor: themeColors[3],
    });
  }
}
