import { forwardRef, Module, ModuleMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '#modules/user/models/user.entity';
import { ValueProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Profile } from '#modules/user/models/profile.entity';
import { SpotifyModule } from '#modules/spotify/spotify.module';
import { UserDetailController } from '#modules/user/user-detail.controller';
import { UploadModule } from '#modules/upload/upload.module';
import { MatchModule } from '#modules/matchs/match.module';

const modelProviders: ValueProvider[] = [
  {
    provide: User,
    useValue: User,
  },
  {
    provide: Profile,
    useValue: Profile,
  },
];

export const UserModuleMetadata: ModuleMetadata = {
  controllers: [UserDetailController],
  providers: [...modelProviders, UserService],
  imports: [SpotifyModule, UploadModule, forwardRef(() => MatchModule)],
  exports: [UserService],
};

@Module(UserModuleMetadata)
export class UserModule {}
