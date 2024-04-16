import { Module, ModuleMetadata } from '@nestjs/common';
import { AuthMeController } from './controllers/auth-me.controller';
import { AuthService } from './services/auth.service';
import { AuthSpotifyController } from './controllers/auth-spotify.controller';
import { UserModule } from '#modules/user/user.module';
import { SecurityModule } from '#core/security/security.module';
import { ConfigurationModule } from '#core/configuration/configuration.module';
import { AuthAccessToken } from '#modules/auth/models/auth-access-token.entity';
import { AuthController } from '#modules/auth/controllers/auth.controller';
import { AuthAccessTokenService } from '#modules/auth/services/auth-access-token.service';
import { SpotifyPassportModule } from '#core/passport/spotify/spotify-passport.module';
import { ValueProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AuthProvider } from '#modules/auth/models/auth-provider.entity';

const modelProviders: ValueProvider[] = [
  {
    provide: AuthAccessToken,
    useValue: AuthAccessToken,
  },
  {
    provide: AuthProvider,
    useValue: AuthProvider,
  },
];

export const AuthModuleMetadata: ModuleMetadata = {
  controllers: [AuthMeController, AuthSpotifyController, AuthController],
  providers: [...modelProviders, AuthService, AuthAccessTokenService],
  imports: [
    UserModule,
    SecurityModule,
    ConfigurationModule,
    SpotifyPassportModule,
  ],
  exports: [AuthService],
};

@Module(AuthModuleMetadata)
export class AuthModule {}
