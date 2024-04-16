import {
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SpotifyAuthGuard extends AuthGuard('spotify') {
  private readonly logger = new Logger(SpotifyAuthGuard.name);

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
      throw new InternalServerErrorException();
    }
    return user;
  }
}
