import { ResponseDto } from '#core/beans/Dto';
import { Nested } from '#core/decorators/Nested';
import { Expose } from 'class-transformer';
import { UserInfo } from '#modules/matchs/responses/Profiles.response';

export class SendMatchRequestResponseData extends ResponseDto<SendMatchRequestResponseData> {
  @Expose()
  isMatch: boolean;

  @Nested(() => UserInfo)
  userInfo: UserInfo;
}

export class SendMatchRequestResponse extends ResponseDto<SendMatchRequestResponse> {
  @Nested(() => SendMatchRequestResponseData)
  data: SendMatchRequestResponseData;
}
