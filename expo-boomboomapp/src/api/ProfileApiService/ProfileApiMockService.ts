import { singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import {
  CreateProfileBody,
  EditProfileBody,
  ProfileApiServiceI,
  StackProfileI,
} from "./ProfileApiServiceI";
import {
  user_helena,
  user_isabella,
  user_jessica,
  user_yohan,
} from "../../mocks/mokes";
import { Gender } from "../../services/UserService/userServiceI";

@singleton()
export class ProfileApiMockService implements ProfileApiServiceI {
  async createProfile(createProfileBody: CreateProfileBody) {
    return Promise.resolve(user_yohan);
  }

  async getProfile() {
    return Promise.resolve(user_yohan);
  }

  async getStackProfiles(): Promise<StackProfileI[]> {
    const stackProfiles = [user_isabella, user_helena, user_jessica];
    return Promise.resolve(
      stackProfiles.map(({ user, songs }) => {
        return {
          user: {
            ...user,
            id: uuidv4(),
          },
          songs,
        };
      })
    );
  }
  async editProfile(editedProfileBody: EditProfileBody) {
    const { description, dateOfBirth, fullName, gender } = editedProfileBody;
    user_yohan.description = description as string;
    user_yohan.dateOfBirth = dateOfBirth as string;
    user_yohan.name = fullName as string;
    user_yohan.preferedGenderId = gender as Gender;

    return Promise.resolve(user_yohan);
  }
}
