import { Track } from "swagger-boomboom-backend";

export type Profile = { user: { name: string; image: any }; songs: Track[] };
