import { ResponseDto } from '#core/beans/Dto';
import { Expose } from 'class-transformer';
import { Nested } from '#core/decorators/Nested';
import { UserDto } from '#modules/user/models/user.dto';
import { PickType } from '@nestjs/swagger';
import { ProfileDto } from '#modules/user/models/profile.dto';

class UserInfoProfile extends PickType(ProfileDto, [
  'description',
  'gendersToShow',
  'gender',
  'dateOfBirth',
]) {}

class UserInfoData extends PickType(UserDto, ['name', 'id']) {
  @Expose()
  @Nested(() => UserInfoProfile)
  profile?: UserInfoProfile;
}

export class UserInfoResponse extends ResponseDto<UserInfoResponse> {
  @Expose()
  @Nested(() => UserInfoData)
  data: UserInfoData;
}
