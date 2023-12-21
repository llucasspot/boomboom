import {singleton} from 'tsyringe';
import {SpotifyApiServiceI} from "./SpotifyApiServiceI";
import {songs} from "../../mocks/mokes";

@singleton()
export class SpotifyApiMockService implements SpotifyApiServiceI {

    async fetchTop5Tracks() {
        const tracks = await this.fetchTracksNyName()
        return tracks.slice(0, 5);
    }

    fetchTracksNyName(name?: string) {
        return Promise.resolve(songs.filter(song => {
            return name ? song.name.toLowerCase().includes(name.toLowerCase()) : true
        }))
    }
}
