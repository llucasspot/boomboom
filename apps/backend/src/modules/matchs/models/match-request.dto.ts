import { IsUUID } from 'class-validator';
import { Dto } from '#core/beans/Dto';
import { Expose } from 'class-transformer';
import { UserDto } from '#modules/user/models/user.dto';
import { Nested } from '#core/decorators/Nested';

export class MatchRequestDto extends Dto<MatchRequestDto> {
  @Expose()
  id: string;

  @Expose()
  @IsUUID(4)
  requestedUserId: UserDto['id'];
  @Nested(() => UserDto)
  requestedUser?: UserDto;

  @Expose()
  @IsUUID(4)
  requesterUserId: UserDto['id'];
  @Nested(() => UserDto)
  requesterUser?: UserDto;

  creationDate: Date;
  updatedOn: Date;
  deletionDate?: Date;
}
