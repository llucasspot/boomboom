import { PickType } from '@nestjs/swagger';
import { ProfileDto } from '#modules/user/models/profile.dto';
import { UserDto } from '#modules/user/models/user.dto';
import { Expose } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { StringLength } from '#core/database/models/beans/columns-enums';

export class CreateOneProfileBody extends PickType(ProfileDto, [
  'description',
  'dateOfBirth',
  'gender',
  'gendersToShow',
  'trackIds',
]) {
  @Expose()
  @MaxLength(StringLength.LONG)
  name: UserDto['name'];
}
