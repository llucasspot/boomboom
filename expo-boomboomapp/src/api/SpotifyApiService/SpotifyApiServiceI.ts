export type Track = {
  popularity?: number;
  name: string; // song name
  trackId: string;
  album?: string; // album name
  image?: string; // song image
  artistName?: string;
  uri: string;
};

export abstract class SpotifyApiServiceI {
  abstract fetchTop5Tracks(): Promise<Track[]>;

  abstract fetchTracksNyName(
    name?: string
  ): Promise<{ data: Track[]; status: boolean }>;
}
