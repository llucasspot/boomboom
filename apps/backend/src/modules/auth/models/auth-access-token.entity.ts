import {
  BelongsTo,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';
import {
  ColumnEnum,
  ColumnForeignUUID,
  ColumnUUID,
  Table,
} from '#core/database/models/beans/columns';
import {
  AuthAccessTokenDto,
  AuthAccessTokenType,
} from '#modules/auth/models/auth-access-token.dto';
import { TableName } from '#core/database/models/beans/tables';
import { BelongToAssociation } from '#core/database/models/beans/associations/BelongToAssociation';
import { HasOneAssociation } from '#core/database/models/beans/associations/HasOneAssociation';

@Table(TableName.AUTH_ACCESS_TOKENS)
export class AuthAccessToken
  extends Model<AuthAccessTokenDto, AuthAccessTokenDto>
  implements AuthAccessTokenDto
{
  @PrimaryKey
  @ColumnUUID()
  id: AuthAccessTokenDto['id'];

  @ColumnEnum(AuthAccessTokenType)
  type: AuthAccessTokenDto['type'];

  @ForeignKey(() => AuthAccessToken)
  @ColumnForeignUUID(false)
  refreshTokenId?: AuthAccessTokenDto['refreshTokenId'];
  @BelongsTo(() => AuthAccessToken)
  refreshToken?: AuthAccessToken;
  $refreshToken = new BelongToAssociation<
    this,
    'refreshToken',
    this['refreshToken'],
    'refreshTokenId'
  >(this, 'refreshToken');
  @HasOne(() => AuthAccessToken)
  accessToken?: AuthAccessToken;
  $accessToken = new HasOneAssociation<
    this,
    'accessToken',
    this['accessToken'],
    'refreshTokenId'
  >(this, 'accessToken');

  @CreatedAt
  creationDate: AuthAccessTokenDto['creationDate'];
  @UpdatedAt
  updatedOn: AuthAccessTokenDto['updatedOn'];
  @DeletedAt
  deletionDate: AuthAccessTokenDto['deletionDate'];
}
