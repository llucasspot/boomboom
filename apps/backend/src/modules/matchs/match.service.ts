import { ForbiddenException, Injectable } from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { User } from '#modules/user/models/user.entity';
import { UserService } from '#modules/user/user.service';

@Injectable()
export class MatchService extends GenericService {
  static ERROR_PROFILE_NOT_SET = 'PROFILE_NOT_SET';

  constructor(private userService: UserService) {
    super();
  }

  public async getProfilesToShow(user: User, page: number, limit: number) {
    const userProfile = await user.$profile.get();
    if (!userProfile) {
      throw new ForbiddenException(MatchService.ERROR_PROFILE_NOT_SET);
    }
    const offset = (page - 1) * limit;
    return this.userService.getProfilesToShowForProfile(user, userProfile, {
      limit,
      offset,
    });
  }
}
