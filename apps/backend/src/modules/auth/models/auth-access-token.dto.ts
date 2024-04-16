import { IsEnum } from 'class-validator';
import { Dto } from '#core/beans/Dto';

export enum AuthAccessTokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

export class AuthAccessTokenDto extends Dto<AuthAccessTokenDto> {
  id: string;

  @IsEnum(AuthAccessTokenType)
  type: AuthAccessTokenType;

  refreshTokenId?: string;

  creationDate: Date;
  updatedOn: Date;
  deletionDate?: Date;
}
