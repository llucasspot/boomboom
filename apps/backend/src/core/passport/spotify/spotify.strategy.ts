import { Strategy } from 'passport-auth0';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { SpotifyOauthConfig } from '#core/passport/spotify/SpotifyOauth.config';
import {
  OauthStrategy,
  OauthStrategyProfile,
  OauthStrategyValidateResult,
} from '#core/passport/beans/Oauth.strategy';
import { OauthProviderName } from '#core/passport/beans/OauthProviderName';

export class SpotifyStrategyProfile extends OauthStrategyProfile<{
  display_name: string;
  external_urls: {
    spotify: `https://api.spotify.com/user/${string}`;
  };
  href: `https://api.spotify.com/v1/users/${string}`;
  id: string;
  images: string[];
  type: 'user' | string;
  uri: `spotify:user:${string}`;
  followers: {
    total: number;
  };
  country: 'FR' | string;
  product: 'free' | string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  email: string; // only if 'user-read-email' in scope
}> {}

@Injectable()
export class SpotifyStrategy
  extends PassportStrategy(Strategy, 'spotify')
  implements OauthStrategy<SpotifyStrategyProfile>
{
  constructor(spotifyOauthConfig: SpotifyOauthConfig) {
    super({
      domain: 'accounts.spotify.com',
      clientID: spotifyOauthConfig.clientID,
      clientSecret: spotifyOauthConfig.clientSecret,
      callbackURL: spotifyOauthConfig.callbackURL,
      authorizationURL: 'https://accounts.spotify.com/authorize',
      tokenURL: 'https://accounts.spotify.com/api/token',
      userInfoURL: 'https://api.spotify.com/v1/me',
      scope: [
        'user-read-email',
        'user-read-private',
        'user-follow-read',
        'user-top-read',
      ],
      state: false,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: OauthStrategyProfile,
    done: (
      err: Error | undefined,
      user: OauthStrategyValidateResult<SpotifyStrategyProfile>,
    ) => void,
  ) {
    return done(
      null,
      new OauthStrategyValidateResult<SpotifyStrategyProfile>({
        accessToken,
        refreshToken,
        profile,
        providerName: OauthProviderName.SPOTIFY,
      }),
    );
  }
}
