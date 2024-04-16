import { Injectable } from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { SpotifyOauthConfig } from '#core/passport/spotify/SpotifyOauth.config';
import { AuthenticateUserResponse } from '#modules/auth/controllers/beans/reponses/AuthenticateUser.response';
import { User } from '#modules/user/models/user.entity';
import { AuthProvider } from '#modules/auth/models/auth-provider.entity';
import { OauthProviderName } from '#core/passport/beans/OauthProviderName';

@Injectable()
export class SpotifyAuthApiService extends GenericService {
  constructor(private spotifyOauthConfig: SpotifyOauthConfig) {
    super();
  }

  async getUserSpotifyProvider(user: User): Promise<AuthProvider | undefined> {
    const authProviders = await user.$authProviders.get({
      where: {
        name: OauthProviderName.SPOTIFY,
      },
    });
    return authProviders[0];
  }

  async rotateSpotifyAuthTokens(spotifyProvider?: AuthProvider) {
    if (!spotifyProvider) {
      return;
    }
    const authenticateUserResponse = await this.getSpotifyAuthTokens(
      new AuthenticateUserResponse({
        access_token: spotifyProvider.accessToken,
        refresh_token: spotifyProvider.refreshToken,
        id: spotifyProvider.id,
      }),
    );
    await spotifyProvider.update({
      accessToken: authenticateUserResponse.access_token,
      refreshToken: authenticateUserResponse.refresh_token,
    });
  }

  private async getSpotifyAuthTokens(
    authenticateUserResponse: AuthenticateUserResponse,
  ): Promise<AuthenticateUserResponse> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: authenticateUserResponse.refresh_token,
        client_id: this.spotifyOauthConfig.clientID,
        client_secret: this.spotifyOauthConfig.clientSecret,
      }),
    });
    const data = await response.json();
    return new AuthenticateUserResponse({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      id: authenticateUserResponse.id,
    });
  }
}
