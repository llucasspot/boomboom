import {
  CreatedAt,
  DeletedAt,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';
import {
  ColumnString,
  ColumnUUID,
  Table,
} from '#core/database/models/beans/columns';
import { TableName } from '#core/database/models/beans/tables';
import { UserDto } from './user.dto';
import { StringLength } from '#core/database/models/beans/columns-enums';
import { Profile } from './profile.entity';
import { AuthProvider } from '#modules/auth/models/auth-provider.entity';
import { JwtStrategyUserInfo } from '#core/passport/jwt/jwt.strategy';
import { HasOneAssociation } from '#core/database/models/beans/associations/HasOneAssociation';
import { HasManyAssociation } from '#core/database/models/beans/associations/HasManyAssociation';
import { Avatar } from '#modules/user/models/avatar.entity';

@Table(TableName.USERS)
export class User extends Model<UserDto, UserDto> implements UserDto {
  @PrimaryKey
  @ColumnUUID()
  id: UserDto['id'];

  @ColumnString(StringLength.LONG)
  name: UserDto['name'];

  @ColumnString(StringLength.EMAIL)
  email: UserDto['email'];

  @HasOne(() => Profile)
  profile?: Profile;
  $profile = new HasOneAssociation<this, 'profile', this['profile'], 'userId'>(
    this,
    'profile',
  );

  @HasMany(() => AuthProvider)
  authProviders?: AuthProvider[];
  $authProviders = new HasManyAssociation<
    this,
    'authProviders',
    this['authProviders'][0],
    'userId'
  >(this, 'authProviders');

  @HasOne(() => Avatar)
  avatar?: Avatar;
  $avatar = new HasOneAssociation<this, 'avatar', this['avatar'], 'userId'>(
    this,
    'avatar',
  );

  @CreatedAt
  creationDate: UserDto['creationDate'];
  @UpdatedAt
  updatedOn: UserDto['updatedOn'];
  @DeletedAt
  deletionDate: UserDto['deletionDate'];

  info?: JwtStrategyUserInfo;
}
