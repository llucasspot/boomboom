import { User } from '#modules/user/models/user.entity';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
