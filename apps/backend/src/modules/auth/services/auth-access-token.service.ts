import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { ProjectPermission } from '#core/passport/beans/ProjectPermission';
import { SecurityService } from '#core/security/security.service';
import { JwtConfig } from '#config/beans';
import { AuthenticateUserResponse } from '#modules/auth/controllers/beans/reponses/AuthenticateUser.response';
import { AuthAccessToken } from '#modules/auth/models/auth-access-token.entity';
import { AuthAccessTokenType } from '#modules/auth/models/auth-access-token.dto';
import { Op } from 'sequelize';

@Injectable()
export class AuthAccessTokenService extends GenericService {
  constructor(
    @Inject(AuthAccessToken)
    private authAccessToken: typeof AuthAccessToken,
    private securityService: SecurityService,
    private jwtConfig: JwtConfig,
  ) {
    super();
  }

  async invalidateToken(id: AuthAccessToken['id']) {
    const tokenRecord = await this.authAccessToken.findOne({ where: { id } });
    return this.authAccessToken.destroy({
      where: {
        id: {
          [Op.in]: [tokenRecord.id, tokenRecord.refreshTokenId],
        },
      },
    });
  }

  async validateToken(id: AuthAccessToken['id']) {
    const tokenRecord = await this.authAccessToken.findOne({ where: { id } });
    if (!tokenRecord) {
      this.logger.log(`validateToken : ${id} invalid`);
      throw new UnauthorizedException();
    }
  }

  async generateTokenPair(
    { id }: { id: string },
    projectPermission: ProjectPermission = ProjectPermission.DEFAULT_USER,
  ) {
    const accessToken = await AuthAccessToken.create({
      type: AuthAccessTokenType.ACCESS_TOKEN,
    });
    const refreshToken: AuthAccessToken =
      await accessToken.$refreshToken.create({
        type: AuthAccessTokenType.REFRESH_TOKEN,
      });
    const access_token = this.securityService.jwtGenTokenSync({
      sub: id,
      permissions: [projectPermission],
      tid: accessToken.id,
    });
    const refresh_token = this.securityService.jwtGenTokenSync(
      {
        sub: id,
        permissions: [ProjectPermission.REFRESH_TOKEN],
        tid: refreshToken.id,
      },
      {
        expiresIn: this.jwtConfig.refreshTokenExpiresIn,
      },
    );
    return new AuthenticateUserResponse({
      access_token,
      refresh_token,
      id,
    });
  }
}
