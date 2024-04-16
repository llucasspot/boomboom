import { ProfileData, SerializedTrack } from "@boumboum/swagger-backend";

// export interface ProfileToShow {
//   user: ProfileToShowUser;
//   songs: Track[];
// }

export type ProfileToShow = ProfileData;

export type ProfileToShowUser = ProfileData["userInfo"];

// export interface Track {
//   id: string;
//   name?: string;
//   albumName?: string;
//   spotifyUri?: string;
//   spotifyImage?: string;
//   spotifyId?: string;
//   createdAt: Date;
//   updatedAt: Date;
//   userId: string;
// }

export type Track = SerializedTrack;
