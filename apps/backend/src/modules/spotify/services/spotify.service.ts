import { Injectable } from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { User } from '#modules/user/models/user.entity';
import SpotifyApiService from '#modules/spotify/services/spotify-api.service';
import {
  GetUsersTopArtistsAndTracksTypeEnum,
  SearchTypeEnum,
  TrackObject,
} from '@boumboum/swagger-spotify';
import { SerializedTrack } from '#modules/spotify/controllers/beans/responses/serialised-tracks.response';

@Injectable()
export class SpotifyService extends GenericService {
  constructor(private spotifyApiService: SpotifyApiService) {
    super();
  }

  async getUserTopFiveTracks(user: User) {
    const spotifyTracksApi =
      await this.spotifyApiService.buildSpotifyTracksApi(user);
    const resp = await spotifyTracksApi.getUsersTopArtistsAndTracks(
      GetUsersTopArtistsAndTracksTypeEnum.Tracks,
      'medium_term',
      5,
    );
    return resp.data.items as TrackObject[];
  }

  async searchTracks(user: User, query: string) {
    const spotifySearchApi =
      await this.spotifyApiService.buildSpotifySearchApi(user);
    const resp = await spotifySearchApi.search(query, [SearchTypeEnum.Track]);
    return resp.data.tracks?.items ?? [];
  }

  async getTracksInfo(user: User, trackIds: string[]) {
    const spotifyTracksApi =
      await this.spotifyApiService.buildSpotifyTracksApi(user);
    const resp = await spotifyTracksApi.getSeveralTracks(trackIds.join(','));
    return resp.data.tracks;
  }

  public buildSerializedTrack(track: TrackObject) {
    return new SerializedTrack({
      uri: track.uri,
      popularity: track.popularity,
      name: track.name,
      trackId: track.id,
      albumName: track.album?.name,
      albumImage: track.album?.images?.[0],
      artistNames: track.artists?.map((artist) => artist.name) ?? [],
    });
  }
}
