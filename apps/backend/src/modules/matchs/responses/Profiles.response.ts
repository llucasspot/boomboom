import { PickType } from '@nestjs/swagger';
import { Nested } from '#core/decorators/Nested';
import { ResponseDto } from '#core/beans/Dto';
import { ProfileDto } from '#modules/user/models/profile.dto';
import { UserDto } from '#modules/user/models/user.dto';
import { SerializedTrack } from '#modules/spotify/controllers/beans/responses/serialised-tracks.response';
import { Expose } from 'class-transformer';

class UserProfileInfo extends PickType(ProfileDto, [
  'description',
  'gender',
  'trackIds',
]) {}

export class UserInfo extends PickType(UserDto, ['id', 'name']) {
  @Expose()
  avatarUri: string;

  constructor(instance: Omit<UserInfo, 'avatarUri'>) {
    super(instance);
    Object.assign(this, instance);
    this.avatarUri = `/api/users/${instance.id}/profile/avatar`;
  }
}

export class ProfileData extends ResponseDto<ProfileData> {
  @Nested(() => UserProfileInfo)
  profileInfo: UserProfileInfo;

  @Nested(() => UserInfo)
  userInfo: UserInfo;

  @Nested(() => SerializedTrack)
  songs: SerializedTrack[];
}

export class ProfilesResponse extends ResponseDto<ProfilesResponse> {
  @Nested(() => ProfileData)
  data: ProfileData[];

  @Expose()
  total: number;

  @Expose()
  totalPages: number;

  @Expose()
  currentPage: number;

  @Expose()
  nextPage?: number;
}
