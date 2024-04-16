import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { User } from './models/user.entity';
import { OauthStrategyProfile } from '#core/passport/beans/Oauth.strategy';
import { Profile } from '#modules/user/models/profile.entity';
import { Op } from 'sequelize';
import {
  ProfileData,
  UserInfo,
} from '#modules/matchs/responses/Profiles.response';
import { SpotifyService } from '#modules/spotify/services/spotify.service';
import { SerializedTrack } from '#modules/spotify/controllers/beans/responses/serialised-tracks.response';
import { MatchRequestService } from '#modules/matchs/match-request.service';

@Injectable()
export class UserService extends GenericService {
  static ERROR_USER_NOT_EXISTS = 'USER_NOT_EXISTS';

  constructor(
    @Inject(User) private user: typeof User,
    @Inject(Profile) private profile: typeof Profile,
    private spotifyService: SpotifyService,
    @Inject(forwardRef(() => MatchRequestService))
    private matchRequestService: MatchRequestService,
  ) {
    super();
  }

  async findOneNullable(id: string) {
    return await this.user.findOne({
      where: {
        id,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.user.findOne({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
    throw new BadRequestException(UserService.ERROR_USER_NOT_EXISTS);
  }

  async findOrCreate({ _json: profile }: OauthStrategyProfile) {
    const [user] = await this.user.findOrCreate({
      where: {
        email: profile.email,
      },
    });
    return user;
  }

  public async getProfilesToShowForProfile(
    user: User,
    profile: Profile,
    dbParams?: Partial<{
      offset: number;
      limit: number;
    }>,
  ) {
    const userIds =
      await this.matchRequestService.getUserRequestedAndMatchedUserIds(user);
    const { rows: profiles, count } = await this.profile.findAndCountAll({
      where: {
        userId: {
          [Op.notIn]: [user.id, ...userIds],
        },
        gender: {
          [Op.in]: profile.gendersToShow,
        },
      },
      include: {
        association: 'user',
      },
      ...dbParams,
    });

    const profileTracksInfo: Record<Profile['id'], SerializedTrack[]> = {};
    for (profile of profiles) {
      const tracksInfo = await this.spotifyService.getTracksInfo(
        user,
        profile.trackIds,
      );
      profileTracksInfo[profile.id] = tracksInfo.map(
        this.spotifyService.buildSerializedTrack,
      );
    }

    return {
      profiles: profiles.map((profile: Profile) => {
        return new ProfileData({
          profileInfo: profile,
          userInfo: new UserInfo(profile.user.toJSON()),
          songs: profileTracksInfo[profile.id],
        });
      }),
      count,
    };
  }
}
