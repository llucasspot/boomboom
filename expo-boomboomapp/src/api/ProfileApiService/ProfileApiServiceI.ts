import { AuthApi, AuthApiInterface, CreateProfileRequest } from "@swagger/api";
import { Configuration } from "@swagger/configuration";
import { AxiosInstance } from "axios/index";
import * as FileSystem from "expo-file-system";

export type EditProfileBody = Partial<CreateProfileRequest>;

export abstract class ProfileApiServiceI
  extends AuthApi
  implements AuthApiInterface
{
  constructor(
    configuration: Configuration,
    basePath: string,
    axios: AxiosInstance,
    private authTokenGetter: () => Promise<string | null>,
  ) {
    super(configuration, basePath, axios);
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

  private handleFileSystemUploadAsyncResponse(
    response: FileSystem.FileSystemUploadResult,
  ) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw response.body;
  }

  async getBlobedAvatar() {
    const response = await this.getAvatar({ responseType: "blob" });
    const blob = new Blob([response.data]);
    // localUrl is redundant,
    // but funny thing, if we use a direct return the image will not load on the component
    const localUrl = URL.createObjectURL(blob);
    return localUrl;
  }
}
