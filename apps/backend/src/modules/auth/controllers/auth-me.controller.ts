import { HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { ApiBearerAuth } from '#core/swagger/ApiBearerAuth.decorator';
import { ProjectPermission } from '#core/passport/beans/ProjectPermission';
import { ReqUser, RestrictedUser } from '#core/beans/ReqUser';
import { User } from '#modules/user/models/user.entity';
import { Controller } from '#core/swagger/Controller.decorator';
import { AuthService } from '../services/auth.service';
import { AuthenticateUserResponse } from '#modules/auth/controllers/beans/reponses/AuthenticateUser.response';

@ApiBearerAuth()
@Controller('/auth/me')
export class AuthMeController extends GenericService {
  constructor(private authService: AuthService) {
    super();
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @RestrictedUser(ProjectPermission.DEFAULT_USER)
    user: User,
  ): Promise<AuthenticateUserResponse> {
    return this.authService.handleRefreshToken(user);
  }

  @Post('/logout')
  async logout(
    @ReqUser()
    user: User,
  ): Promise<void> {
    return this.authService.logout(user.info.currentAccessTokenId);
  }
}
