import { Module, ModuleMetadata } from '@nestjs/common';
import { PassportModule as NestPassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { ConfigurationModule } from '#core/configuration/configuration.module';
import { AuthModule } from '#modules/auth/auth.module';
import { SpotifyPassportModule } from '#core/passport/spotify/spotify-passport.module';

export const PassportModuleMetadata: ModuleMetadata = {
  imports: [
    ConfigurationModule,
    NestPassportModule,
    AuthModule,
    SpotifyPassportModule,
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [],
};

@Module(PassportModuleMetadata)
export class PassportModule {}
