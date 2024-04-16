import { Test, TestingModule } from '@nestjs/testing';
import { PassportModuleMetadata } from '../passport.module';
import { JwtAuthGuard } from './jwt.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDto } from '#modules/user/models/user.dto';
import { DatabaseService } from '#core/database/services/database.service';
import { ProjectPermission } from '#core/passport/beans/ProjectPermission';

export const DEFAULT_TEST_USER: UserDto & { password: string } = {
  name: 'lala',
  id: 'uuid-uuid-uuid-uuid',
  email: 'lala@lala.com',
  password: '$2b$12$6lydG6vMdVmdqu7YnNB6XeRlFVnELjoQ6q.APHQEltlDt3F6iPsZm',
  creationDate: new Date(),
  updatedOn: new Date(),
};

export const DEFAULT_TEST_USER_PERMISSIONS = [ProjectPermission.DEFAULT_USER];

export const mockExecutionContext: ExecutionContext = {
  switchToHttp: jest.fn().mockReturnThis(),
  switchToWs: jest.fn().mockReturnThis(),
  switchToRpc: jest.fn().mockReturnThis(),
  getClass: jest.fn().mockReturnValue({}),
  getHandler: jest.fn().mockReturnValue({}),
  getType: jest.fn().mockReturnValue({}),
  getArgs: jest.fn().mockReturnValue({}),
  getArgByIndex: jest.fn().mockReturnValue({}),
};

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      PassportModuleMetadata,
    )
      .overrideProvider(DatabaseService)
      .useValue(null)
      .compile();

    jwtAuthGuard = module.get<JwtAuthGuard>(JwtAuthGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should pass authentication when token is valid and route is marked as public', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

    const canActivate = jwtAuthGuard.canActivate(mockExecutionContext);

    expect(canActivate).toBe(true);
  });

  it('should pass authentication when token is valid and route is not marked as public', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);

    const superCanActivate = jest
      .spyOn(JwtAuthGuard.prototype, 'canActivate')
      .mockReturnValue(true);

    const canActivate = jwtAuthGuard.canActivate(mockExecutionContext);

    expect(canActivate).toBe(true);
    expect(superCanActivate).toHaveBeenCalledWith(mockExecutionContext);
  });

  it('should fail authentication when token is missing', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);

    const superCanActivate = jest
      .spyOn(JwtAuthGuard.prototype, 'canActivate')
      .mockReturnValue(false);

    const canActivate = jwtAuthGuard.canActivate(mockExecutionContext);

    expect(canActivate).toBe(false);
    expect(superCanActivate).toHaveBeenCalledWith(mockExecutionContext);
  });

  it('should throw error when handleRequest receives an error', () => {
    const err = new Error('Authentication error');
    const user = DEFAULT_TEST_USER;

    expect(() => {
      jwtAuthGuard.handleRequest(err, user);
    }).toThrow(err);
  });

  it('should throw UnauthorizedException when handleRequest receives no user', () => {
    const err = null;
    const user = null;

    expect(() => {
      jwtAuthGuard.handleRequest(err, user);
    }).toThrow(UnauthorizedException);
  });

  it('should return the user when handleRequest receives no error and a user', () => {
    const err = null;
    const user = DEFAULT_TEST_USER;

    const result = jwtAuthGuard.handleRequest(err, user);

    expect(result).toBe(user);
  });
});
