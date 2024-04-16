import { Module, ModuleMetadata } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { ConfigurationModule } from '#core/configuration/configuration.module';

export const JwtModuleMetadata: ModuleMetadata = {
  providers: [JwtService],
  imports: [JwtService.registerAsync(), ConfigurationModule],
  exports: [JwtService],
};

@Module(JwtModuleMetadata)
export class JwtModule {}
