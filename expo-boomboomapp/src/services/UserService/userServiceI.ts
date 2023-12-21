import {ImageSourcePropType} from "react-native";

export type UserI = {
  profilePicture: {
    uri:  ImageSourcePropType;
    type: "video" | "image";
    name: string;
  };
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  description: string;
  trackIds: string[];
};

export type UserState = UserStateConnected | UserStateNotConnected;

export type UserStateConnected = {
    isConnected: true;
} & UserI;

export type UserStateNotConnected = {
    isConnected: false;
};

export enum Gender {
  MALE = 1,
  FEMALE = 2,
  NO_SPECIFIC = 3,
}
