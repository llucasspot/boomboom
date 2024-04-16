import { Dto } from '#core/beans/Dto';

export class AuthProviderDto extends Dto<AuthProviderDto> {
  id: string;

  userId: string;

  name: string;

  providerUserId: string;

  accessToken: string;

  refreshToken: string;

  expiresIn?: number;

  expiresAt?: Date;

  creationDate: Date;
  updatedOn: Date;
  deletionDate?: Date;
}
