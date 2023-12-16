import {useMemo} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {getGlobalInstance} from '../tsyringe/diUtils';
import StyleService from '../services/StyleService/StyleService';
import ServiceInterface from '../tsyringe/ServiceInterface';
import {StyleState} from '../services/StyleService/StyleStateServiceI';
import {createEStyleSheet} from '../utils/styleUtils';

export default function useEStyle<T>(
  style?: T,
): ViewStyle | TextStyle | ImageStyle {
  const styleStateService = getGlobalInstance<StyleService>(
    ServiceInterface.StyleServiceI,
  );
  const styleChangeToggle: StyleState = styleStateService.useStyle();
  const estyle = useMemo(() => {
    return createEStyleSheet({style: style ?? {}}).style;
  }, [styleChangeToggle, style]);
  return estyle;
}
