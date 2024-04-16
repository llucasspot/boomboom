import { ResponseDto } from '#core/beans/Dto';
import { Expose } from 'class-transformer';

export class AuthenticateUserResponse extends ResponseDto<AuthenticateUserResponse> {
  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;

  @Expose()
  id: string;
}
