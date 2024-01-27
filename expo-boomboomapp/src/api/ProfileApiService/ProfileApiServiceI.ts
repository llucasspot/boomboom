import { Gender } from "../../services/UserService/userServiceI";

export abstract class ProfileI {
  abstract user_id: string;
  abstract date_of_birth: string;
  abstract description: string;
  abstract avatar: string;
  abstract prefered_gender_id: Gender;
  abstract userId: string;
  // TODO name & trackIds is not send my backend in getProfile endpoint
  abstract name: string;
  abstract trackIds: string[];
}

export type CreateProfileBody = {
  dateOfBirth: string;
  description: string;
  preferedGenderId: Gender;
  genderId: Gender;
  trackIds: string[];
  name: string;
};

export type EditProfileBody = Partial<CreateProfileBody>;

export abstract class ProfileApiServiceI {
  abstract createProfile(
    createProfileBody: CreateProfileBody,
  ): Promise<ProfileI>;

  abstract getProfile(): Promise<ProfileI>;

  abstract editProfile(editedProfileBody: EditProfileBody): Promise<ProfileI>;

  abstract uploadAvatar(uri: string): Promise<void>;
}
