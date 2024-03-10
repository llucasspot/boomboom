import { ImageURISource } from "react-native/Libraries/Image/ImageSource";

import { Gender } from "#services/UserService/userServiceI";

export type RegistrationState = {
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
} | null;
