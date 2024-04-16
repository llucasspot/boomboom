import {
  BelongsTo,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';
import {
  ColumnForeignUUID,
  ColumnString,
  ColumnUUID,
  Table,
} from '#core/database/models/beans/columns';
import { TableName } from '#core/database/models/beans/tables';
import { StringLength } from '#core/database/models/beans/columns-enums';
import { ProfileDto } from './profile.dto';
import { User } from './user.entity';
import { AvatarDto } from '#modules/user/models/avatar.dto';

@Table(TableName.AVATARS)
export class Avatar extends Model<AvatarDto, AvatarDto> implements AvatarDto {
  @PrimaryKey
  @ColumnUUID()
  id: AvatarDto['id'];

  @ForeignKey(() => User)
  @ColumnForeignUUID()
  userId: AvatarDto['userId'];
  @BelongsTo(() => User)
  user?: User;

  @ColumnString(StringLength.URL)
  fileName: AvatarDto['fileName'];

  @CreatedAt
  creationDate: ProfileDto['creationDate'];
  @UpdatedAt
  updatedOn: ProfileDto['updatedOn'];
  @DeletedAt
  deletionDate: ProfileDto['deletionDate'];
}
