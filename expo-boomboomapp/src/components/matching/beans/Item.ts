export type Item = {
    idx: number;
    type: 'SONG',
    popularity?: string | undefined,
    name: string,
    trackId: string,
    album?: string | undefined,
    image?: string | undefined,
    artistName: string
} | {
    idx: number;
    name: string,
    image: any,
    type: 'USER'
}
