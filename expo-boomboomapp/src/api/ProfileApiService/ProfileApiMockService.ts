import { singleton } from "tsyringe";

import {
  CreateProfileBody,
  EditProfileBody,
  ProfileApiServiceI,
} from "./ProfileApiServiceI";
import { user_yohan } from "../../mocks/mokes";

@singleton()
export class ProfileApiMockService implements ProfileApiServiceI {
  async createProfile(createProfileBody: CreateProfileBody) {
    return Promise.resolve(user_yohan);
  }

  async getProfile() {
    return Promise.resolve(user_yohan);
  }

  async editProfile(editedProfileBody: EditProfileBody) {
    return Promise.resolve({ ...user_yohan, ...editedProfileBody });
  }

  async uploadAvatar(uri: string): Promise<void> {}
}
