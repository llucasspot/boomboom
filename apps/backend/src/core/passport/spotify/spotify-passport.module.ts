import { Module, ModuleMetadata, Provider } from '@nestjs/common';
import { DefaultConfiguration } from '#config/beans/defineConfig';
import { SpotifyOauthConfig } from '#core/passport/spotify/SpotifyOauth.config';
import config from 'config';
import { SpotifyAuthGuard } from '#core/passport/spotify/spotify.guard';
import { SpotifyStrategy } from '#core/passport/spotify/spotify.strategy';

const configProviders: Provider[] = [
  {
    provide: SpotifyOauthConfig,
    useValue: new SpotifyOauthConfig(
      config.get<DefaultConfiguration['ssoProviders']>('ssoProviders').spotify,
    ),
  },
];

export const SpotifyPassportModuleMetadata: ModuleMetadata = {
  imports: [],
  providers: [...configProviders, SpotifyAuthGuard, SpotifyStrategy],
  exports: [...configProviders],
};

@Module(SpotifyPassportModuleMetadata)
export class SpotifyPassportModule {}
