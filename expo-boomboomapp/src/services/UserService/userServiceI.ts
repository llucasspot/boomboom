import {ImageOrVideo} from 'react-native-image-crop-picker';

export type UserI = {
  profilePicture: {
    uri: ImageOrVideo['path'];
    type: ImageOrVideo['mime'];
    name: string;
  };
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  description: string;
  trackIds: string[];
};

export type UserState = {
  isConnected: boolean;
} & Partial<UserI>;

export enum Gender {
  MALE = 1,
  FEMALE = 2,
  NO_SPECIFIC = 3,
}
