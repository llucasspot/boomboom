import { Get, Query } from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { ApiBearerAuth } from '#core/swagger/ApiBearerAuth.decorator';
import { ProjectPermission } from '#core/passport/beans/ProjectPermission';
import { RestrictedUser } from '#core/beans/ReqUser';
import { User } from '#modules/user/models/user.entity';
import { Controller } from '#core/swagger/Controller.decorator';
import { MatchService } from '#modules/matchs/match.service';
import { ProfilesResponse } from '#modules/matchs/responses/Profiles.response';
import { PageQueries } from '#modules/matchs/queries/Page.queries';

@ApiBearerAuth()
@Controller('/matchs')
export class MatchController extends GenericService {
  constructor(private matchService: MatchService) {
    super();
  }

  @Get('/')
  async getProfilesToShow(
    @RestrictedUser(ProjectPermission.DEFAULT_USER)
    user: User,
    @Query() { page }: PageQueries,
  ): Promise<ProfilesResponse> {
    const limit = 10;
    const { profiles, count } = await this.matchService.getProfilesToShow(
      user,
      page,
      limit,
    );

    return new ProfilesResponse(
      this.buildPageResponse({
        data: profiles,
        count,
        limit,
        page,
      }),
    );
  }

  private buildPageResponse<T, A extends T[]>({
    data,
    limit,
    page,
    count,
  }: {
    data: A;
    limit: number;
    page: number;
    count: number;
  }): {
    data: A;
    total: number;
    currentPage: number;
    totalPages: number;
    nextPage?: number;
  } {
    const totalPages = Math.ceil(count / limit);
    return {
      data: data,
      total: data.length,
      currentPage: page,
      totalPages,
      nextPage: page < totalPages ? page + 1 : undefined,
    };
  }
}
