import { Expose } from 'class-transformer';
import { StringLength } from '#core/database/models/beans/columns-enums';
import { IsEmail, MaxLength } from 'class-validator';
import { Dto } from '#core/beans/Dto';

export class UserDto extends Dto<UserDto> {
  @Expose()
  id: string;

  @Expose()
  @MaxLength(StringLength.LONG)
  name: string;

  @Expose()
  @MaxLength(StringLength.EMAIL)
  @IsEmail()
  email: string;

  @Expose()
  creationDate: Date;
  @Expose()
  updatedOn: Date;
  @Expose()
  deletionDate?: Date;
}
