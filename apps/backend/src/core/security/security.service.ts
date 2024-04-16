import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { JwtSignOptions } from '@nestjs/jwt';
import { JwtService, PayloadValidated } from '#core/jwt/jwt.service';
import { SecurityConfig } from '#config/beans';

@Injectable()
export class SecurityService {
  private NUMBER_OF_ROUND_SALT = this.securityConfig.hashingNumberRoundsSalt;

  constructor(
    private jwtService: JwtService,
    private securityConfig: SecurityConfig,
  ) {}

  bcryptHashSync(
    stringToHash: string,
    numberOfRoundSalt: number = this.NUMBER_OF_ROUND_SALT,
  ): string {
    const salt = bcrypt.genSaltSync(numberOfRoundSalt);
    return bcrypt.hashSync(stringToHash, salt);
  }

  bcryptCompareSync(stringToCompare: string, hashedString: string): boolean {
    return bcrypt.compareSync(stringToCompare, hashedString);
  }

  jwtGenTokenSync(
    payload: Omit<PayloadValidated, 'aud' | 'iat' | 'exp' | 'iss'>,
    options?: JwtSignOptions,
  ): string {
    return this.jwtService.sign(payload, options);
  }
}
