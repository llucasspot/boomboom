export type Track = {
  popularity?: number;
  name: string; // song name
  trackId: string;
  album?: string; // album name
  image?: string; // song image
  artistName?: string;
  uri: string;
};

export type FetchTracksNyNameResponse = { data: Track[] };

export abstract class SpotifyApiServiceI {
  abstract fetchTop5Tracks(): Promise<Track[]>;

  abstract fetchTracksNyName(name?: string): Promise<FetchTracksNyNameResponse>;
}
