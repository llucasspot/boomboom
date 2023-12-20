export type Track = {
    popularity?: string;
    name: string; // song name
    trackId: string;
    album?: string; // album name
    image?: string; // song image
    artistName: string
};

export abstract class SpotifyApiServiceI {

    abstract fetchTop5Tracks(): Promise<Track[]>

    abstract fetchTracksNyName(name?: string): Promise<Track[]>
}
