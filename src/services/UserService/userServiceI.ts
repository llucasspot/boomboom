import { ImageURISource } from "react-native/Libraries/Image/ImageSource";

export type UserI = {
  profilePicture: {
    uri: ImageURISource["uri"];
    type: "video" | "image";
    name: string;
  };
  fullName: string;
  dateOfBirth: string;
  genderId: Gender;
  preferedGenderId: Gender;
  description: string;
  trackIds: string[];
};

export enum Gender {
  MALE = 1,
  FEMALE = 2,
  NO_SPECIFIC = 3,
}
