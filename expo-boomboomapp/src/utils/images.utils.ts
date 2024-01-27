import { ImageSourcePropType } from "react-native";

export function buildImageSource(
  source?: string | ImageSourcePropType,
): ImageSourcePropType {
  if (typeof source === "string" && source.startsWith("http")) {
    return { uri: source };
  }
  return source as ImageSourcePropType;
}
