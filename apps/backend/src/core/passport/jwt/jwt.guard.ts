import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<UserDto>(err: Error | undefined, user: UserDto) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err) {
      this.logger.error(err, err.stack);
      throw new UnauthorizedException();
    }
    return user;
  }
}
