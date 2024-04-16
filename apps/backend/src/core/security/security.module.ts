import { Module, ModuleMetadata } from '@nestjs/common';
import { SecurityService } from './security.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigurationModule } from '#core/configuration/configuration.module';
import { JwtModule } from '#core/jwt/jwt.module';

export const SecurityModuleMetadata: ModuleMetadata = {
  providers: [SecurityService],
  imports: [
    ConfigurationModule,
    JwtModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60, // Time to live for request data (in seconds)
        limit: 10, // Maximum number of requests per defined TTL
      },
    ]),
  ],
  exports: [SecurityService],
};

@Module(SecurityModuleMetadata)
export class SecurityModule {}
