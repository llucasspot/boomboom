import { Param, Post } from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { ApiBearerAuth } from '#core/swagger/ApiBearerAuth.decorator';
import { ProjectPermission } from '#core/passport/beans/ProjectPermission';
import { RestrictedUser } from '#core/beans/ReqUser';
import { User } from '#modules/user/models/user.entity';
import { Controller } from '#core/swagger/Controller.decorator';
import { MatchRequestService } from '#modules/matchs/match-request.service';
import { SendMatchRequestResponse } from '#modules/matchs/responses/SendMatchRequest.response';

@ApiBearerAuth()
@Controller('/matchs/:userId/requests')
export class MatchRequestController extends GenericService {
  constructor(private matchRequestService: MatchRequestService) {
    super();
  }

  @Post('/')
  async sendMatchRequestToUser(
    @RestrictedUser(ProjectPermission.DEFAULT_USER)
    user: User,
    @Param('userId') requestedUserId: string,
  ): Promise<SendMatchRequestResponse> {
    return this.matchRequestService.sendMatchRequestToUser({
      requesterUser: user,
      requestedUserId,
    });
  }
}
