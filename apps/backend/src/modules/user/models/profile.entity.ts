import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';
import {
  ColumnEnum,
  ColumnEnumArray,
  ColumnForeignUUID,
  ColumnString,
  ColumnStringArray,
  ColumnUUID,
  Table,
} from '#core/database/models/beans/columns';
import { TableName } from '#core/database/models/beans/tables';
import { StringLength } from '#core/database/models/beans/columns-enums';
import { Gender, ProfileDto } from './profile.dto';
import { User } from './user.entity';

@Table(TableName.PROFILES)
export class Profile
  extends Model<ProfileDto, ProfileDto>
  implements ProfileDto
{
  @PrimaryKey
  @ColumnUUID()
  id: ProfileDto['id'];

  @ForeignKey(() => User)
  @ColumnForeignUUID()
  userId: ProfileDto['userId'];
  @BelongsTo(() => User)
  user?: User;

  @ColumnString(StringLength.TEXT, false)
  description: ProfileDto['description'];

  @Column(DataType.DATE)
  dateOfBirth: ProfileDto['dateOfBirth'];

  @ColumnEnum(Gender)
  gender: ProfileDto['gender'];

  @ColumnEnumArray<ProfileDto>(Gender, 'gendersToShow')
  gendersToShow: ProfileDto['gendersToShow'];

  @ColumnStringArray<ProfileDto>('trackIds')
  trackIds: ProfileDto['trackIds'];

  @CreatedAt
  creationDate: ProfileDto['creationDate'];
  @UpdatedAt
  updatedOn: ProfileDto['updatedOn'];
  @DeletedAt
  deletionDate: ProfileDto['deletionDate'];
}
