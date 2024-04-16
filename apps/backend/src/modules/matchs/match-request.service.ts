import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { UserService } from '#modules/user/user.service';
import { User } from '#modules/user/models/user.entity';
import { MatchRequest } from '#modules/matchs/models/match-request.entity';
import { Op } from 'sequelize';
import { Match } from '#modules/matchs/models/match.entity';
import { SendMatchRequestResponse } from '#modules/matchs/responses/SendMatchRequest.response';
import { UserInfo } from '#modules/matchs/responses/Profiles.response';

@Injectable()
export class MatchRequestService extends GenericService {
  static ERROR_CANT_MATCH_YOUR_SELF = 'CANT_MATCH_YOUR_SELF';

  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(MatchRequest) private matchRequest: typeof MatchRequest,
    @Inject(Match) private match: typeof Match,
  ) {
    super();
  }

  async getUserRequestedAndMatchedUserIds(user: User) {
    const requestedUserIds = await this.matchRequest
      .findAll({
        where: {
          requesterUserId: user.id,
        },
        attributes: ['requestedUserId'],
      })
      .then((requests) => requests.map((request) => request.requestedUserId));
    const matchedUserIds = await this.match
      .findAll({
        where: {
          [Op.or]: [{ requesterUserId: user.id }, { requestedUserId: user.id }],
        },
        attributes: ['requestedUserId', 'requesterUserId'],
      })
      .then((requests) =>
        requests.map((request) => {
          if (request.requesterUserId === user.id) {
            return request.requestedUserId;
          }
          return request.requesterUserId;
        }),
      );
    return [...requestedUserIds, ...matchedUserIds];
  }

  async sendMatchRequestToUser({
    requesterUser,
    requestedUserId,
  }: {
    requesterUser: User;
    requestedUserId: User['id'];
  }): Promise<SendMatchRequestResponse> {
    if (requesterUser.id === requestedUserId) {
      throw new BadRequestException(
        MatchRequestService.ERROR_CANT_MATCH_YOUR_SELF,
      );
    }
    const requestedUser = await this.userService.findOne(requestedUserId);
    const matchRequest = await this.findMatchRequest(
      requesterUser.id,
      requestedUserId,
    );
    if (!matchRequest) {
      await this.matchRequest.create({
        requestedUserId: requestedUser.id,
        requesterUserId: requesterUser.id,
      });
      return new SendMatchRequestResponse({
        data: {
          isMatch: false,
          userInfo: new UserInfo(requestedUser.toJSON()),
        },
      });
    }
    await this.createMatch(matchRequest);
    return new SendMatchRequestResponse({
      data: {
        isMatch: true,
        userInfo: new UserInfo(requestedUser.toJSON()),
      },
    });
  }

  private async createMatch(matchRequest: MatchRequest) {
    await this.match.create({
      requestedUserId: matchRequest.requesterUserId,
      requesterUserId: matchRequest.requestedUserId,
    });
    await matchRequest.destroy();
  }

  private findMatchRequest(
    user1Id: User['id'],
    user2Id: User['id'],
  ): Promise<MatchRequest | null> {
    return this.matchRequest.findOne({
      where: {
        [Op.or]: [
          { requesterUserId: user1Id, requestedUserId: user2Id },
          { requesterUserId: user2Id, requestedUserId: user1Id },
        ],
      },
    });
  }
}
