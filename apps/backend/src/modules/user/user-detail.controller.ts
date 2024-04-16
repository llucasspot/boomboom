import { Get, Param, Res } from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { Controller } from '#core/swagger/Controller.decorator';
import { Response } from 'express';
import { UploadService } from '#modules/upload/upload.service';
import { UserService } from '#modules/user/user.service';

@Controller('/users/:userId')
export class UserDetailController extends GenericService {
  constructor(
    private userService: UserService,
    private uploadService: UploadService,
  ) {
    super();
  }

  @Get('/profile/avatar')
  async getUserAvatar(
    @Param('userId') userId: string,
    @Res()
    response: Response,
  ) {
    const user = await this.userService.findOne(userId);
    return this.uploadService.serveUserFile(response, user);
  }
}
