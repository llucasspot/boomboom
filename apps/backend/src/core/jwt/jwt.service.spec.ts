import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from './jwt.service';
import { JwtModuleMetadata } from './jwt.module';
import { JsonWebTokenError } from 'jsonwebtoken';
import { DatabaseService } from '#core/database/services/database.service';
import { JwtConfig } from '#config/beans';

describe('JwtService', () => {
  let jwtService: JwtService;
  let jwtConfig: JwtConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      JwtModuleMetadata,
    )
      .overrideProvider(DatabaseService)
      .useValue(null)
      .compile();

    jwtService = module.get<JwtService>(JwtService);
    jwtConfig = module.get<JwtConfig>(JwtConfig);
  });

  it('should be defined', () => {
    expect(jwtService).toBeDefined();
  });

  it('token should be valid', () => {
    const payload = {};
    const token = jwtService.sign(payload);
    const { exp, iat, iss, aud, ...validatedPayload } =
      jwtService.verify(token);
    expect({
      exp,
      iat,
      aud,
      iss,
      ...validatedPayload,
    }).toEqual({
      exp,
      iat,
      aud: jwtConfig.audience,
      iss: jwtConfig.issuer,
      ...payload,
    });
  });

  it('token should not be valid', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    try {
      jwtService.verify(token);
      fail('Expected an JsonWebTokenError error to be thrown');
    } catch (error: any) {
      if (error instanceof JsonWebTokenError) {
        expect(error.name).toEqual(JsonWebTokenError.name);
      }
    }
  });

  it('payload should be the same', () => {
    const payload = {};
    const token = jwtService.sign(payload);
    const { exp, iat, iss, aud, ...validatedPayload } =
      jwtService.decode(token);
    expect({
      exp,
      iat,
      aud,
      iss,
      ...validatedPayload,
    }).toEqual({
      exp,
      iat,
      aud: jwtConfig.audience,
      iss: jwtConfig.issuer,
      ...payload,
    });
  });
});
