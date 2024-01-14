import { singleton } from "tsyringe";

import {
  FetchTracksNyNameResponse,
  SpotifyApiServiceI,
} from "./SpotifyApiServiceI";
import { songs } from "../../mocks/mokes";

@singleton()
export class SpotifyApiMockService implements SpotifyApiServiceI {
  async fetchTop5Tracks() {
    const tracks = await this.fetchTracksNyName();
    return tracks.data.slice(0, 5);
  }

  fetchTracksNyName(name?: string): Promise<FetchTracksNyNameResponse> {
    const tracks = songs.filter((song) => {
      return name ? song.name.toLowerCase().includes(name.toLowerCase()) : true;
    });
    return Promise.resolve({
      data: tracks,
    });
  }
}
