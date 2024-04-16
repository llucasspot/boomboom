import { Module, ModuleMetadata } from '@nestjs/common';
import { SpotifyTracksController } from '#modules/spotify/controllers/spotify-tracks.controller';
import { SpotifyService } from '#modules/spotify/services/spotify.service';
import SpotifyApiService from '#modules/spotify/services/spotify-api.service';
import { SpotifyAuthApiService } from '#modules/spotify/services/spotify-auth-api.service';
import { SpotifyPassportModule } from '#core/passport/spotify/spotify-passport.module';

export const SpotifyModuleMetadata: ModuleMetadata = {
  controllers: [SpotifyTracksController],
  providers: [SpotifyService, SpotifyApiService, SpotifyAuthApiService],
  imports: [SpotifyPassportModule],
  exports: [SpotifyService],
};

@Module(SpotifyModuleMetadata)
export class SpotifyModule {}
