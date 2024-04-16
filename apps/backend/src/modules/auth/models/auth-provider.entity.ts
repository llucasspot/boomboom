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
  ColumnForeignUUID,
  ColumnNumber,
  ColumnString,
  ColumnUUID,
  Table,
} from '#core/database/models/beans/columns';
import { TableName } from '#core/database/models/beans/tables';
import { User } from '#modules/user/models/user.entity';
import { AuthProviderDto } from './auth-provider.dto';
import { OauthProviderName } from '#core/passport/beans/OauthProviderName';
import {
  NumberLength,
  StringLength,
} from '#core/database/models/beans/columns-enums';
import { BelongToAssociation } from '#core/database/models/beans/associations/BelongToAssociation';

@Table(TableName.AUTH_PROVIDERS)
export class AuthProvider
  extends Model<AuthProviderDto, AuthProviderDto>
  implements AuthProviderDto
{
  @PrimaryKey
  @ColumnUUID()
  id: AuthProviderDto['id'];

  @ColumnEnum(OauthProviderName)
  name: AuthProviderDto['name'];

  @ColumnString(StringLength.LONG)
  accessToken: AuthProviderDto['accessToken'];

  @ColumnString(StringLength.LONG)
  refreshToken: AuthProviderDto['refreshToken'];

  @Column(DataType.DATE)
  expiresAt: AuthProviderDto['expiresAt'];

  @ColumnNumber(NumberLength.INTEGER, false)
  expiresIn: AuthProviderDto['expiresIn'];

  @ColumnString(StringLength.LONG)
  providerUserId: AuthProviderDto['providerUserId'];

  @ForeignKey(() => User)
  @ColumnForeignUUID()
  userId: AuthProviderDto['userId'];
  @BelongsTo(() => User)
  user?: User;
  $user = new BelongToAssociation<this, 'user', this['user'], 'id'>(
    this,
    'user',
  );

  @CreatedAt
  creationDate: AuthProviderDto['creationDate'];
  @UpdatedAt
  updatedOn: AuthProviderDto['updatedOn'];
  @DeletedAt
  deletionDate: AuthProviderDto['deletionDate'];
}
