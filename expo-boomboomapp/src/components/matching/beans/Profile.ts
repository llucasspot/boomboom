import {Track} from "../../../api/SpotifyApiService/SpotifyApiServiceI";

export type Profile = { user: { name: string, image: any }, songs: Track[] }
