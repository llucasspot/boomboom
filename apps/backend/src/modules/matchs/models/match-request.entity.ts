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
  ColumnUUID,
  Table,
} from '#core/database/models/beans/columns';
import { AuthAccessTokenDto } from '#modules/auth/models/auth-access-token.dto';
import { TableName } from '#core/database/models/beans/tables';
import { BelongToAssociation } from '#core/database/models/beans/associations/BelongToAssociation';
import { User } from '#modules/user/models/user.entity';
import { MatchRequestDto } from '#modules/matchs/models/match-request.dto';

@Table(TableName.MATCH_REQUESTS)
export class MatchRequest
  extends Model<MatchRequestDto, MatchRequestDto>
  implements MatchRequestDto
{
  @PrimaryKey
  @ColumnUUID()
  id: MatchRequestDto['id'];

  @ForeignKey(() => User)
  @ColumnForeignUUID()
  requesterUserId: MatchRequestDto['requestedUserId'];
  @BelongsTo(() => User)
  requesterUser: User;
  $requesterUser = new BelongToAssociation<
    this,
    'requesterUser',
    this['requesterUser'],
    'id'
  >(this, 'requesterUser');

  @ForeignKey(() => User)
  @ColumnForeignUUID()
  requestedUserId: MatchRequestDto['requesterUserId'];
  @BelongsTo(() => User)
  requestedUser: User;
  $requestedUser = new BelongToAssociation<
    this,
    'requestedUser',
    this['requestedUser'],
    'id'
  >(this, 'requestedUser');

  @CreatedAt
  creationDate: AuthAccessTokenDto['creationDate'];
  @UpdatedAt
  updatedOn: AuthAccessTokenDto['updatedOn'];
  @DeletedAt
  deletionDate: AuthAccessTokenDto['deletionDate'];
}
