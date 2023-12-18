export type UserI = {
  profilePicture: {
    uri:  string;
    type: "video" | "image";
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
