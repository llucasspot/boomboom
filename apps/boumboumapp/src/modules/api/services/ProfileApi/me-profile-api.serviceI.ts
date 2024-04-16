/* eslint-disable react-hooks/rules-of-hooks */
import {
  Configuration,
  CreateOneProfileBody,
  MeProfileApi,
  MeProfileApiInterface,
} from "@boumboum/swagger-backend";
import { useQuery } from "@tanstack/react-query";
import { Blob as NodeBlob } from "buffer";
import * as FileSystem from "expo-file-system";
import { URL } from "react-native-url-polyfill";

import { useMutation } from "#modules/api/hooks/useMutation.hook";
import { ApiRequesterServiceI } from "#modules/api/services/ApiRequester.serviceI";
import { LoggerService } from "#modules/core/logger/logger.service";

export abstract class MeProfileApiServiceI
  extends MeProfileApi
  implements MeProfileApiInterface
{
  public useProfileKeys = [
    this.constructor.name,
    this.meProfileControllerGetInfo.name,
  ];
  public useAvatarKeys = [this.constructor.name, this.getBlobedAvatar.name];
  protected logger = LoggerService.create(this.constructor.name);

  constructor(private apiRequesterServiceI: ApiRequesterServiceI) {
    super(
      new Configuration(),
      apiRequesterServiceI.getApiBaseUrl(),
      apiRequesterServiceI.apiRequester,
    );
  }

  useProfile() {
    return useQuery({
      queryKey: this.useProfileKeys,
      queryFn: () =>
        this.meProfileControllerGetInfo().then((response) => {
          return response.data;
        }),
    });
  }

  useCreateProfile() {
    return useMutation({
      mutationFn: (body: CreateOneProfileBody) =>
        this.meProfileControllerCreateProfile(body).then((response) => {
          return response.data;
        }),
      logger: this.logger,
      i18nActionKey: "createProfile",
      invalidateQueries: this.useProfileKeys,
    });
  }

  async uploadAvatarByUri(uri: string): Promise<void> {
    try {
      const response = await FileSystem.uploadAsync(
        `${this.basePath}/api/me/profile/avatar`,
        uri,
        {
          httpMethod: "POST",
          fieldName: "file",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            Authorization: `Bearer ${await this.apiRequesterServiceI.accessTokenGetter()}`,
          },
        },
      );
      this.handleFileSystemUploadAsyncResponse(response);
    } catch (error) {
      // TODO handle error
      console.error("Error uploading image:", error);
    }
  }

  useAvatar() {
    return useQuery({
      queryKey: this.useAvatarKeys,
      queryFn: () => this.getBlobedAvatar(),
    });
  }

  private async getBlobedAvatar() {
    const response = await this.meProfileControllerGetAvatar({
      responseType: "blob",
    });
    const blob = new Blob([response.data as unknown as File]) as NodeBlob;
    return URL.createObjectURL(blob);
  }

  private handleFileSystemUploadAsyncResponse(
    response: FileSystem.FileSystemUploadResult,
  ) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw response.body;
  }
}
