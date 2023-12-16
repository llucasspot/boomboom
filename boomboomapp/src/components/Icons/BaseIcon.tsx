import React, {useCallback, useMemo} from 'react';
import {
  ColorValue,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import useEStyle from '../../hooks/useEStyle';
import iconConfig, {IconConfig} from './icon.config';
import {IconName} from './IconName';
import {IconTheme} from './IconTheme';
import {styleSheetCompose} from '../../utils/styleUtils';

export type Icon = ({...props}: Omit<BaseIconProps, 'name'>) => JSX.Element;

export type BaseIconProps = {
  name: IconName;
  color?: string | ColorValue;
  size?: number;
  style?: StyleProp<ViewStyle>;
  theme?: IconTheme;
};

const getIconToRender = (name: IconName, theme: IconTheme): IconConfig => {
  const iconsAvailables = iconConfig[name];
  const iconFound = iconsAvailables.find(
    iconAvailable => iconAvailable.theme === theme,
  );
  if (iconFound) {
    return iconFound;
  }
  return iconsAvailables[0];
};

const getIconToRenderProperties = (
  iconToRender: IconConfig,
  color?: ColorValue,
): SvgProperties => {
  switch (iconToRender.theme) {
    case IconTheme.FEATHER:
    case IconTheme.BOOMBOOM:
    case IconTheme.UNDRAW:
    case IconTheme.FONTAWESOME_REGULAR:
      return {
        svgColorPropertyColor: color,
        svgFillPropertyColor: 'transparent',
      };
    case IconTheme.FONTAWESOME_SOLID:
      return {
        svgColorPropertyColor: 'transparent',
        svgFillPropertyColor: color,
      };
    default:
      return {
        svgColorPropertyColor: 'transparent',
        svgFillPropertyColor: color,
      };
  }
};

const isIconSrcAnSvg = (src: string | ImageSourcePropType): src is string => {
  return typeof src === 'string';
};

type SvgProperties = {
  svgColorPropertyColor?: ColorValue;
  svgFillPropertyColor?: ColorValue;
};

const BaseIcon = ({
  name,
  size = 32,
  color = 'black',
  theme = IconTheme.BOOMBOOM,
  style,
}: BaseIconProps): JSX.Element => {
  const eStyle = useEStyle(style);
  const eColorr = useEStyle({backgroundColor: color});
  const eColor = eColorr?.backgroundColor ?? 'black';
  const iconToRender: IconConfig = useMemo<IconConfig>(
    () => getIconToRender(name, theme),
    [],
  );

  const styles = StyleSheet.create({
    image: {
      width: size,
      height: size,
    },
  });

  const svgProperties: SvgProperties = useMemo<SvgProperties>(
    () => getIconToRenderProperties(iconToRender, eColor),
    [],
  );

  const renderIcon = useCallback<() => JSX.Element>(() => {
    if (isIconSrcAnSvg(iconToRender.svg)) {
      return (
        <SvgXml
          style={eStyle}
          color={svgProperties.svgColorPropertyColor}
          fill={svgProperties.svgFillPropertyColor}
          width={size}
          height={size}
          xml={iconToRender.svg}
        />
      );
    }
    return (
      <Image
        // @ts-ignore image exception
        style={styleSheetCompose<ImageStyle>(eStyle, styles.image)}
        source={iconToRender.svg}
      />
    );
  }, []);

  return <>{renderIcon()}</>;
};

export default BaseIcon;
