/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { AxiosHeaders, AxiosResponse } from "axios";
import * as FileSystem from "expo-file-system";
import {
  AuthApi,
  AuthApiInterface,
  Configuration,
  CreateProfileRequest,
} from "swagger-boomboom-backend";

import { useMutation } from "#api/useMutation.hook";
import LoggerService from "#services/LoggerService/LoggerService";
import { buildApiRequester } from "#utils/api.utils";

export type EditProfileBody = Partial<CreateProfileRequest>;

export abstract class ProfileApiServiceI
  extends AuthApi
  implements AuthApiInterface
{
  protected logger = LoggerService.create(this.constructor.name);
  constructor(
    basePath: string,
    private authTokenGetter: () => Promise<string | null>,
  ) {
    super(
      new Configuration(),
      basePath,
      buildApiRequester(basePath, authTokenGetter),
    );
  }

  private useProfileKeys = [this.constructor.name, this.getProfile.name];

  useProfile() {
    return useQuery({
      queryKey: this.useProfileKeys,
      queryFn: () =>
        this.getProfile().then((response) => {
          return response.data;
        }),
    });
  }

  useCreateProfile() {
    return useMutation({
      mutationFn: (body: CreateProfileRequest) =>
        this.createProfile(body).then((response) => {
          return response.data;
        }),
      logger: this.logger,
      i18nActionKey: "updateBankDetails",
      invalidateQueries: this.useProfileKeys,
    });
  }

  // TODO get from backend
  async editProfile(
    editedProfileBody: EditProfileBody,
  ): Promise<AxiosResponse<any, any>> {
    return {
      request: {},
      data: {},
      headers: {},
      status: 200,
      statusText: "OK",
      config: {
        headers: new AxiosHeaders(),
      },
    };
  }

  useUpdateProfile() {
    return useMutation({
      mutationFn: (body: EditProfileBody) =>
        this.editProfile(body).then((response) => {
          return response.data;
        }),
      logger: this.logger,
      i18nActionKey: "updateBankDetails",
      invalidateQueries: this.useProfileKeys,
    });
  }

  async uploadAvatarByUri(uri: string): Promise<void> {
    try {
      const response = await FileSystem.uploadAsync(
        `${this.basePath}/api/auth/profile/avatar`,
        uri,
        {
          httpMethod: "POST",
          fieldName: "avatar",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            Authorization: `Bearer ${await this.authTokenGetter()}`,
          },
        },
      );
      this.handleFileSystemUploadAsyncResponse(response);
    } catch (error) {
      // TODO handle error
      console.error("Error uploading image:", error);
    }
  }

  async getBlobedAvatar() {
    const response = await this.getAvatar({ responseType: "blob" });
    const blob = new Blob([response.data]);
    // localUrl is redundant,
    // but funny thing, if we use a direct return the image will not load on the component
    const localUrl = URL.createObjectURL(blob);
    return localUrl;
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
