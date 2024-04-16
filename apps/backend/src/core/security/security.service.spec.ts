import { Test, TestingModule } from '@nestjs/testing';
import { SecurityService } from './security.service';
import { SecurityModuleMetadata } from './security.module';
import bcrypt from 'bcrypt';
import { JwtService } from '#core/jwt/jwt.service';
import { SecurityConfig } from '#config/beans';
import { DatabaseService } from '#core/database/services/database.service';

describe('SecurityService', () => {
  let securityService: SecurityService;
  let jwtService: JwtService;
  let securityConfig: SecurityConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      SecurityModuleMetadata,
    )
      .overrideProvider(DatabaseService)
      .useValue(null)
      .compile();

    securityService = module.get<SecurityService>(SecurityService);
    jwtService = module.get<JwtService>(JwtService);
    securityConfig = module.get<SecurityConfig>(SecurityConfig);
  });

  describe('bcryptHashSync', () => {
    it('should hash the string with the default number of round salt', () => {
      const stringToHash = 'password';

      const genSaltSyncSpy = jest.spyOn(bcrypt, 'genSaltSync');

      const hashedString = securityService.bcryptHashSync(stringToHash);

      expect(genSaltSyncSpy).toHaveBeenCalledWith(
        securityConfig.hashingNumberRoundsSalt,
      );
      expect(typeof hashedString).toBe('string');
    });

    it('should hash the string with the provided number of round salt', () => {
      const stringToHash = 'password';
      const numberOfRoundSalt = 10;

      const genSaltSyncSpy = jest.spyOn(bcrypt, 'genSaltSync');

      const hashedString = securityService.bcryptHashSync(
        stringToHash,
        numberOfRoundSalt,
      );

      expect(genSaltSyncSpy).toHaveBeenCalledWith(numberOfRoundSalt);
      expect(typeof hashedString).toBe('string');
    });
  });

  describe('bcryptCompareSync', () => {
    it('should return true when the string matches the hashed string', () => {
      const stringToCompare = 'password';
      const hashedString = securityService.bcryptHashSync(stringToCompare);

      const result = securityService.bcryptCompareSync(
        stringToCompare,
        hashedString,
      );

      expect(result).toBe(true);
    });

    it('should return false when the string does not match the hashed string', () => {
      const stringToCompare = 'password';
      const hashedString = securityService.bcryptHashSync('different-password');

      const result = securityService.bcryptCompareSync(
        stringToCompare,
        hashedString,
      );

      expect(result).toBe(false);
    });
  });

  describe('jwtGenTokenSync', () => {
    it('should generate a JWT token synchronously', () => {
      const payload = { sub: '1', permissions: [], tid: '1' };
      const token = 'generated-token';

      const signSpy = jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = securityService.jwtGenTokenSync(payload);

      expect(signSpy).toHaveBeenCalledWith(payload, undefined);
      expect(result).toBe(token);
    });

    it('should generate a JWT token synchronously with options', () => {
      const payload = { sub: '1', permissions: [], tid: '1' };
      const options = { expiresIn: '1h' };
      const token = 'generated-token';

      const signSpy = jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = securityService.jwtGenTokenSync(payload, options);

      expect(signSpy).toHaveBeenCalledWith(payload, options);
      expect(result).toBe(token);
    });
  });
});
