import { ImageSourcePropType } from "react-native";

import { ApiRequesterService } from "#modules/api/services/ApiRequester.service";
import { diService } from "#modules/core/di/di-utils";

export function buildImageSource(
  source?: string | ImageSourcePropType,
): ImageSourcePropType {
  const apiRequesterService = diService.getInstance(ApiRequesterService);

  // If the source is a string, assume it's a URL and build an ImageURISource object
  if (typeof source === "string") {
    if (source.startsWith("/")) {
      return {
        uri: `${apiRequesterService.getApiBaseUrl()}${source}`,
      };
    }

    return { uri: source };
  }

  // If it's a number, assume it's a local image resource (ImageRequireSource)
  if (typeof source === "number") {
    return source;
  }

  // If it's already an object, assume it's either ImageURISource or ImageURISource[]
  // (Note: Further checks can be added here if needed to validate the object structure)
  if (typeof source === "object") {
    return source;
  }

  return {};
}
