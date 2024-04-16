import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { OauthStrategyValidateResult } from '#core/passport/beans/Oauth.strategy';
import { AuthAccessTokenService } from '#modules/auth/services/auth-access-token.service';
import { UserDto } from '#modules/user/models/user.dto';
import { UserService } from '#modules/user/user.service';
import { JwtStrategyUserInfo } from '#core/passport/jwt/jwt.strategy';

@Injectable()
export class AuthService extends GenericService {
  constructor(
    private userService: UserService,
    private authAccessTokenService: AuthAccessTokenService,
  ) {
    super();
  }

  async logout(tokenId: string) {
    await this.authAccessTokenService.invalidateToken(tokenId);
  }

  async handleRefreshToken(user: UserDto) {
    this.logger.log(`token rotation for user ${user.id}`);
    return this.authAccessTokenService.generateTokenPair(user);
  }

  async handleSsoCallback({
    accessToken,
    refreshToken,
    providerName,
    profile,
  }: OauthStrategyValidateResult) {
    const user = await this.userService.findOrCreate(profile);
    await user.$authProviders.create({
      name: providerName,
      providerUserId: profile._json.id,
      accessToken,
      refreshToken,
    });
    return this.authAccessTokenService.generateTokenPair(user);
  }

  async findOneUserForSession(userId: string, info: JwtStrategyUserInfo) {
    const user = await this.userService.findOneNullable(userId);
    await this.authAccessTokenService.validateToken(info.currentAccessTokenId);
    if (!user) {
      this.logger.log(`findOneUserForSession : no user`);
      throw new UnauthorizedException();
    }
    return user;
  }
}
