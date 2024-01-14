import { Gender } from "../../services/UserService/userServiceI";
import { Track } from "../SpotifyApiService/SpotifyApiServiceI";

export abstract class ProfileI {
  abstract id: string;
  abstract dateOfBirth: string;
  abstract description: string;
  abstract avatar: string;
  abstract preferedGenderId: Gender;
  abstract userId: string;
  // TODO name & trackIds is not send my backend in getProfile endpoint
  abstract name: string;
  abstract trackIds: string[];
}

export type StackProfileI = {
  user: {
    id: string;
    name: string;
    image: any;
  };
  songs: Track[];
};

export type CreateProfileBody = {
  dateOfBirth: string;
  description: string;
  preferedGenderId: Gender;
  trackIds: string[];
};

export type EditProfileBody = {
  fullName?: string;
  dateOfBirth?: string;
  gender?: Gender;
  description?: string;
};

export abstract class ProfileApiServiceI {
  abstract createProfile(
    createProfileBody: CreateProfileBody
  ): Promise<ProfileI>;

  abstract getProfile(): Promise<ProfileI>;

  abstract getStackProfiles(): Promise<StackProfileI[]>;

  abstract editProfile(editedProfileBody: EditProfileBody): Promise<ProfileI>;
}
