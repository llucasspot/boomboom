import { forwardRef, Module, ModuleMetadata } from '@nestjs/common';
import { MatchRequestController } from '#modules/matchs/match-request.controller';
import { MatchRequest } from '#modules/matchs/models/match-request.entity';
import { ValueProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { MatchRequestService } from '#modules/matchs/match-request.service';
import { Match } from '#modules/matchs/models/match.entity';
import { UserModule } from '#modules/user/user.module';
import { MatchController } from '#modules/matchs/match.controller';
import { MatchService } from '#modules/matchs/match.service';

const modelProviders: ValueProvider[] = [
  {
    provide: MatchRequest,
    useValue: MatchRequest,
  },
  {
    provide: Match,
    useValue: Match,
  },
];

export const MatchModuleMetadata: ModuleMetadata = {
  controllers: [MatchRequestController, MatchController],
  providers: [...modelProviders, MatchRequestService, MatchService],
  imports: [forwardRef(() => UserModule)],
  exports: [MatchRequestService],
};

@Module(MatchModuleMetadata)
export class MatchModule {}
