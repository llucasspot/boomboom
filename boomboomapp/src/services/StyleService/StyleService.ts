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
        // colors
        $backgroundColor: newStyle.backgroundColor,
        $fontColor: newStyle.fontColor,
        $primaryColor: newStyle.primaryColor,
        $secondaryColor: newStyle.secondaryColor,
        $grayPlaceholderColor: 'rgba(120,120,120, 1)',
        $white: '#FFFFFF',
        $black: '#000000',
        $grey: '#6c757d',
        $successColor: newStyle.successColor,
        $errorColor: newStyle.errorColor,
        $iconColor: '#ced4da',
        $spotLightBackgroundColor: '#dee2e6',
        $themeListColor: '#242424FF',
        $externalLinkColor: '#c8b6ff',
        $optionsColor: '#415a77',
        $lowOpacityBackground: 'rgba(0, 0, 0, 0.5)',
        $modalColor: '#212529',
        $modalOptions: '#4ea8de',
        // switch colors
        $switchTrackColorOn: '#134611',
        $switchTrackColorOff: '#767577',
        $switchThumbColorOn: '#16db65',
        $switchThumbColorOff: '#f4f3f4',
        // radius
        $extraSmallBorderRadius: 10,
        $smallBorderRadius: 15, // for buttons
        $mediumBorderRadius: 20,
        $borderRadius4: 25,
        $largeBorderRadius: 30,
        $messageBorderRadius: 20,
        $roundedBorderRadius: 30,
        $circleBorderRadius: 100,
        // buttons
        $buttonFontSize: '1rem',
        $buttonIconFontSize: '1.2rem',
        $buttonThemeSize: '2.2rem',
        $profilePictureSmall: '7.5rem',
        $profilePictureMedium: '9rem',
        $optionsLarge: '3.1rem',
        // spacing
        $spacerList: 5,
        $spacer0: '0.2rem',
        $spacer1: '0.4rem',
        $spacer2: '0.6rem',
        $spacer3: '0.8rem',
        $spacer4: '1rem',
        $spacer5: '1.33rem',
        $spacer6: '1.66rem',
        $spacer7: '2rem',
        $spacer8: '3rem',
        $spacer9: '4rem',
        // anti-spacing
        $antiSpacer4: '-1rem',
        // text
        $modalDescription: '0.7rem',
        $normalTextSettings: '0.85rem',
        $subtitleSettings: '0.9rem',
        $titleSettings: '1.1rem',
        $titleSpot: '1.3rem',
        // weight
        $lightFontWeight: '300',
        $normalTextFontWeight: '400',
        $subtitleFontWeight: '600',
        $titleFontWeight: '900',
        // icons
        $smallIconSize: '1.2rem',
        $mediumIconSize: '1.4rem',
        $iconSize3: '1.6rem',
        $iconSize4: '1.8rem',
        $iconSize5: '2.2rem',
        // widths & heights
        $modalWidth: '16rem',
        $modalHeight: '9rem',
        $smallSpotPicturesHeight: '4rem',
        $multilineInputHeight: '6.5rem',
        $smallModalSpot: '5.5rem',
        $smallModalCreateSpot: '4rem',
        $dragHandleHeight: '0.25rem',
        $dragHandleWidth: '5rem',
        $validationButtonHeight: '2.75rem',
        // shadow
        $defaultElevation: 64,
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
