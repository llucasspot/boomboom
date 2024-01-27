export type Item =
  | {
      id: string;
      type: "SONG";
      popularity?: string | undefined;
      name?: string;
      trackId: string;
      album?: string | undefined;
      spotifyImage?: string;
      artistName: string;
    }
  | {
      id: string;
      name?: string;
      spotifyImage?: string;
      type: "USER";
    };
