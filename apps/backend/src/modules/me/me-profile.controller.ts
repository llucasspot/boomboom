import {
  BadRequestException,
  Body,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { ApiBearerAuth } from '#core/swagger/ApiBearerAuth.decorator';
import { ProjectPermission } from '#core/passport/beans/ProjectPermission';
import { RestrictedUser } from '#core/beans/ReqUser';
import { UserInfoResponse } from '#modules/auth/controllers/beans/reponses/UserInfo.response';
import { User } from '#modules/user/models/user.entity';
import { Controller } from '#core/swagger/Controller.decorator';
import { CreateOneProfileBody } from '#modules/me/bodies/CreateOneProfile.body';
import { ApiBadRequestResponse } from '#core/swagger/ApiBadRequestResponse.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadStorageServiceI } from '#core/FileUploadStorageModule/services/FileUploadStorage.serviceI';
import { FileType, UploadService } from '#modules/upload/upload.service';
import { ApiNoContentResponse } from '#core/swagger/ApiNoContentResponse.decorator';
import { Response } from 'express';
import { ApiProduces } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('/me/profile')
export class MeProfileController extends GenericService {
  constructor(private uploadService: UploadService) {
    super();
  }

  @Get('/avatar')
  @ApiNoContentResponse()
  @ApiProduces('image/jpeg')
  async getAvatar(
    @RestrictedUser(ProjectPermission.DEFAULT_USER)
    user: User,
    @Res()
    response: Response,
  ) {
    return this.uploadService.serveUserFile(response, user);
  }

  @Post('/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        // TODO
        // fileSize: FileUploadStorageServiceI.CHUNK_SIZE + 1,
      },
      fileFilter: (req, file, callback) => {
        if (FileUploadStorageServiceI.CHUNKS_MIMES.includes(file.mimetype)) {
          callback(null, true);
          return;
        }
        callback(
          new BadRequestException(FileUploadStorageServiceI.UPLOAD_MIMES_ERROR),
          false,
        );
        return;
      },
    }),
  )
  async uploadAvatarFile(
    @RestrictedUser(ProjectPermission.DEFAULT_USER)
    user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileName = await this.uploadService.uploadUserFile(
      user,
      file,
      FileType.AVATAR,
    );
    await user.$avatar.create({
      fileName,
    });
  }

  @Get('/')
  async getInfo(
    @RestrictedUser(ProjectPermission.DEFAULT_USER)
    user: User,
  ): Promise<UserInfoResponse> {
    const profile = await user.$profile.get();
    return new UserInfoResponse({
      data: {
        ...user.toJSON(),
        profile,
      },
    });
  }

  @Post('/')
  @ApiBadRequestResponse()
  async createProfile(
    @RestrictedUser(ProjectPermission.DEFAULT_USER)
    user: User,
    @Body() { name, trackIds, ...createOneProfileBody }: CreateOneProfileBody,
  ): Promise<UserInfoResponse> {
    await user.update({
      name,
    });
    const profile = await user.$profile.create({
      ...createOneProfileBody,
      trackIds,
    });
    return new UserInfoResponse({
      data: {
        ...user.toJSON(),
        profile,
      },
    });
  }
}
