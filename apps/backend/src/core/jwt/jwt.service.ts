import { Injectable } from '@nestjs/common';
import {
  JwtModuleOptions,
  JwtService as NestJwtService,
  JwtSignOptions,
  JwtVerifyOptions,
} from '@nestjs/jwt';
import jwt from 'jsonwebtoken';
import { JwtModule as NestJwtModule } from '@nestjs/jwt/dist/jwt.module';
import { ProjectPermission } from '#core/passport/beans/ProjectPermission';
import { ConfigurationModule } from '#core/configuration/configuration.module';
import { JwtConfig } from '#config/beans';

export type PayloadValidated = {
  sub: string;
  permissions: ProjectPermission[];
  tid: string;
  exp: number;
  iat: number;
  aud: string;
  iss: string;
};

@Injectable()
export class JwtService {
  constructor(protected jwtService: NestJwtService) {}

  static registerAsync() {
    return NestJwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: (jwtConfig: JwtConfig): JwtModuleOptions => {
        return {
          secret: jwtConfig.secret,
          signOptions: {
            expiresIn: jwtConfig.expiresIn,
            issuer: jwtConfig.issuer,
            audience: jwtConfig.audience,
            algorithm: jwtConfig.algorithms[0],
          },
          verifyOptions: {
            algorithms: jwtConfig.algorithms,
            audience: jwtConfig.audience,
            ignoreExpiration: false,
            issuer: jwtConfig.issuer,
          },
        };
      },
      inject: [JwtConfig],
    });
  }

  verify(token: string, options?: JwtVerifyOptions) {
    return this.jwtService.verify<PayloadValidated>(token, options);
  }

  sign<T extends object>(payload: T, options?: JwtSignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  decode(token: string, options?: jwt.DecodeOptions) {
    return this.jwtService.decode<PayloadValidated>(token, options);
  }
}
