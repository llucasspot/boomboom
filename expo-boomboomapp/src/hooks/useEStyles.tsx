import { useMemo } from "react";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

import StyleService from "../services/StyleService/StyleService";
import { StyleState } from "../services/StyleService/StyleStateServiceI";
import ServiceInterface from "../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../tsyringe/diUtils";
import { createEStyleSheet } from "../utils/styleUtils";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export default function useEStyles<T>(
  styles: T | NamedStyles<T>,
): NamedStyles<T> {
  const styleStateService = getGlobalInstance<StyleService>(
    ServiceInterface.StyleServiceI,
  );
  const styleChangeToggle: StyleState = styleStateService.useStyle();
  const estyle = useMemo(() => {
    return createEStyleSheet(styles);
  }, [styleChangeToggle, styles]);
  return estyle;
}
