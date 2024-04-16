import { Expose } from 'class-transformer';
import { IsUUID, MaxLength } from 'class-validator';
import { Dto } from '#core/beans/Dto';
import { Nested } from '#core/decorators/Nested';
import { UserDto } from './user.dto';
import { StringLength } from '#core/database/models/beans/columns-enums';

export class AvatarDto extends Dto<AvatarDto> {
  @Expose()
  id: string;

  @Expose()
  @MaxLength(StringLength.URL)
  fileName?: string;

  @Expose()
  @IsUUID(4)
  userId: UserDto['id'];
  @Nested(() => UserDto)
  user?: UserDto;

  @Expose()
  creationDate: Date;
  @Expose()
  updatedOn: Date;
  @Expose()
  deletionDate?: Date;
}
