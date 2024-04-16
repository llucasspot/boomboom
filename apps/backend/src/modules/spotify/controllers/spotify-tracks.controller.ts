import { Get, Query } from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { ApiBearerAuth } from '#core/swagger/ApiBearerAuth.decorator';
import { ProjectPermission } from '#core/passport/beans/ProjectPermission';
import { RestrictedUser } from '#core/beans/ReqUser';
import { User } from '#modules/user/models/user.entity';
import { Controller } from '#core/swagger/Controller.decorator';
import { SpotifyService } from '#modules/spotify/services/spotify.service';
import { SerializedTracksResponse } from '#modules/spotify/controllers/beans/responses/serialised-tracks.response';

@ApiBearerAuth()
@Controller('/spotify/tracks')
export class SpotifyTracksController extends GenericService {
  constructor(protected spotifyService: SpotifyService) {
    super();
  }

  @Get('/top-five')
  async getUserTopFiveTracks(
    @RestrictedUser(ProjectPermission.DEFAULT_USER)
    user: User,
  ) {
    const tracks = await this.spotifyService.getUserTopFiveTracks(user);
    return new SerializedTracksResponse({
      data: tracks.map(this.spotifyService.buildSerializedTrack),
    });
  }

  @Get('/search')
  async getTracksByName(
    @RestrictedUser(ProjectPermission.DEFAULT_USER)
    user: User,
    @Query('query')
    query: string,
  ) {
    const tracks = await this.spotifyService.searchTracks(user, query);
    return new SerializedTracksResponse({
      data: tracks.map(this.spotifyService.buildSerializedTrack),
    });
  }
}
