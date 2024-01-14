import { inject, singleton } from "tsyringe";

import {
  CreateProfileBody,
  ProfileI,
  ProfileApiServiceI,
  StackProfileI,
  EditProfileBody,
} from "./ProfileApiServiceI";
import ConfigurationService from "../../services/ConfigurationService/ConfigurationService";
import ErrorService from "../../services/ErrorService/ErrorService";
import StorageService from "../../services/StorageService/StorageService";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import { ApiService } from "../ApiService";
import * as FileSystem from "expo-file-system";

@singleton()
export class ProfileApiService
  extends ApiService
  implements ProfileApiServiceI
{
  constructor(
    @inject(ServiceInterface.StorageServiceI)
    protected storageService: StorageService,
    @inject(ServiceInterface.ConfigurationService)
    protected configurationService: ConfigurationService,
    @inject(ServiceInterface.ErrorService)
    protected errorService: ErrorService
  ) {
    super("profile", storageService, configurationService, errorService);
  }

  async createProfile(createProfileBody: CreateProfileBody) {
    const res = await this.apiRequester.post<ProfileI>("/", createProfileBody);
    return res.data;
  }

  async getProfile() {
    const res = await this.apiRequester.get<ProfileI>("/");
    return res.data;
  }

  async getStackProfiles() {
    // TODO url
    const res = await this.apiRequester.get<StackProfileI[]>("/TODO");
    return res.data;
  }

  async editProfile(editedProfileBody: EditProfileBody) {
    // TODO url
    const res = await this.apiRequester.put<ProfileI>(
      "/TODO",
      editedProfileBody
    );
    return res.data;
  }

  async uploadAvatar(uri: string): Promise<void> {
    try {
      const response = await FileSystem.uploadAsync(
          `${this.apiRequester.getUri()}/avatar`,
          uri,
          {
            httpMethod: 'POST',
            fieldName: 'avatar',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            headers: {
              Authorization: `Bearer ${await this.storageService.getAuthenticateToken()}`
            }
          }
      );
      this.handleFileSystemUploadAsyncResponse(response)
    } catch (error) {
      // TODO handle error
      console.error('Error uploading image:', error);
    }
  };

  private handleFileSystemUploadAsyncResponse(response: FileSystem.FileSystemUploadResult) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw response.body;
  }
}
