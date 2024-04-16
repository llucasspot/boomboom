import { Module } from '@nestjs/common';
import { ConfigurationModule } from '#core/configuration/configuration.module';
import { DatabaseModule } from '#core/database/database.module';
import { PassportModule } from '#core/passport/passport.module';
import { AuthModule } from '#modules/auth/auth.module';
import { MeModule } from '#modules/me/me.module';
import { SpotifyModule } from '#modules/spotify/spotify.module';
import { MatchModule } from '#modules/matchs/match.module';
import { UserModule } from '#modules/user/user.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    PassportModule,
    AuthModule,
    MeModule,
    SpotifyModule,
    MatchModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
