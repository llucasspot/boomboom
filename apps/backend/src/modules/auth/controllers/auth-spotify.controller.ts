import { Controller } from '#core/swagger/Controller.decorator';
import { GenericService } from '#core/generic.service';
import { Get, Res, UseGuards } from '@nestjs/common';
import { SpotifyAuthGuard } from '#core/passport/spotify/spotify.guard';
import { ReqUser } from '#core/beans/ReqUser';
import { OauthStrategyValidateResult } from '#core/passport/beans/Oauth.strategy';
import { SpotifyStrategyProfile } from '#core/passport/spotify/spotify.strategy';
import { AuthService } from '../services/auth.service';
import { AuthenticateUserResponse } from '#modules/auth/controllers/beans/reponses/AuthenticateUser.response';
import { SpotifyOauthConfig } from '#core/passport/spotify/SpotifyOauth.config';
import { Response } from 'express';

@Controller('/auth/spotify')
@UseGuards(SpotifyAuthGuard)
export class AuthSpotifyController extends GenericService {
  constructor(
    private authService: AuthService,
    private spotifyOauthConfig: SpotifyOauthConfig,
  ) {
    super();
  }

  @Get('/')
  async authorize() {}

  @Get('/callback')
  async callback(
    @ReqUser() user: OauthStrategyValidateResult<SpotifyStrategyProfile>,
    @Res() res: Response,
  ) {
    const authenticateUserResponse =
      await this.authService.handleSsoCallback(user);
    res.redirect(this.buildSuccessUrl(authenticateUserResponse));
  }

  private buildSuccessUrl(authenticateUserResponse: AuthenticateUserResponse) {
    const url = new URL(this.spotifyOauthConfig.successURL);
    url.searchParams.append(
      'access_token',
      authenticateUserResponse.access_token,
    );
    url.searchParams.append(
      'refresh_token',
      authenticateUserResponse.refresh_token,
    );
    url.searchParams.append('userId', authenticateUserResponse.id);
    return url.toString();
  }
}
