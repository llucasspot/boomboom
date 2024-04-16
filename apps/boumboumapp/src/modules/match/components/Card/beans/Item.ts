export type Item =
  | {
      id?: string;
      type: "SONG";
      popularity?: number;
      name?: string;
      trackId?: string;
      album?: string | undefined;
      spotifyImage?: string;
      artistName?: string;
    }
  | {
      id?: string;
      name?: string;
      spotifyImage?: string;
      type: "USER";
    };
