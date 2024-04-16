import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ProjectPermission } from '#core/passport/beans/ProjectPermission';
import { User } from '#modules/user/models/user.entity';

const reqUserLogger = new Logger('ReqUser');
const restrictedUserLogger = new Logger('RestrictedUser');

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (!request.user) {
      reqUserLogger.error('Bearer access_token is not valid');
      throw new UnauthorizedException();
    }
    return request.user;
  },
);

export const RestrictedUser = createParamDecorator(
  (
    _permission: ProjectPermission | ProjectPermission[],
    ctx: ExecutionContext,
  ): User => {
    const permissions = Array.isArray(_permission)
      ? _permission
      : [_permission];
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;
    if (!user || !user.info) {
      restrictedUserLogger.error('Bearer access_token is not valid');
      throw new UnauthorizedException();
    }
    if (
      !permissions.some((permission) => {
        const include = user.info.permissions.includes(permission);
        if (!include) {
          restrictedUserLogger.warn(
            `Permission ${permission} not found in user's ${user.id} permissions ${user.info.permissions}`,
          );
        }
        return include;
      })
    ) {
      throw new ForbiddenException();
    }
    return user;
  },
);
