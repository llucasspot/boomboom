import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Blurhash } from "react-native-blurhash";
import FastImage, { FastImageProps, Source } from "react-native-fast-image";

import ImageService from "../../services/ImageService/ImageService";
import StorageService from "../../services/StorageService/StorageService";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../tsyringe/diUtils";

type AuthImageProps = Omit<FastImageProps, "source"> & {
  uri: string;
  headers: Source["headers"];
  cache: Source["cache"];
  priority: Source["priority"];
};

export function AuthImage({
  uri,
  headers,
  cache,
  priority = FastImage.priority.normal,
  resizeMode = FastImage.resizeMode.contain,
  onLoadStart,
  onLoadEnd,
  ...props
}: AuthImageProps) {
  const [loading, setLoading] = useState(true);
  const imageService = getGlobalInstance<ImageService>(
    ServiceInterface.ImageService,
  );
  const storageService = getGlobalInstance<StorageService>(
    ServiceInterface.StorageServiceI,
  );

  const { data: token, isLoading } = useQuery({
    queryKey: [storageService.getAuthenticateToken.name],
    queryFn: async () => {
      return storageService.getAuthenticateToken();
    },
  });

  if (loading && isLoading) {
    return (
        <Blurhash
            blurhash="UPAdWXNHMcIA%%o|MdaJEjozxHn~IVsWtRW:"
            style={{ width: 118, height: 118 }}
        />
    );
  }

  // if (imageInfo) {
  //   return <Blurhash blurhash={imageInfo.blurHash ?? ""} />;
  // }

  return (
    <FastImage
      {...props}
      source={{
        uri,
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers,
        },
        priority,
        cache,
      }}
      onLoadEnd={() => {
        onLoadEnd?.();
        setLoading(false);
      }}
      resizeMode={resizeMode}
    />
  );
}
