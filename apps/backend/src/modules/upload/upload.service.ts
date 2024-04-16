import { Injectable } from '@nestjs/common';
import { GenericService } from '#core/generic.service';
import { FileUploadStorageServiceI } from '#core/FileUploadStorageModule/services/FileUploadStorage.serviceI';
import { User } from '#modules/user/models/user.entity';
import { Response } from 'express';
import mime from 'mime/lite';
import { NoContentException } from '#app/errors/exceptions/no-content.exception';

export enum FileType {
  AVATAR = 'avatar',
}

@Injectable()
export class UploadService extends GenericService {
  constructor(private fileUploadStorageService: FileUploadStorageServiceI) {
    super();
  }

  async uploadUserFile(
    user: User,
    file: Express.Multer.File,
    fileType: FileType,
  ): Promise<string> {
    const fileName = this.buildFinalFileName(user, file, fileType);
    await this.fileUploadStorageService.upload(file, fileName);
    return fileName;
  }

  async serveUserFile(response: Response, user: User) {
    const avatar = await user.$avatar.get();
    if (!avatar) {
      throw new NoContentException();
    }
    const fileName = avatar.fileName;
    response.setHeader('Content-Type', this.getMimeType(fileName));
    return this.fileUploadStorageService.serveFile(response, fileName);
  }

  private getMimeType(fileName: string): string {
    // @ts-expect-error mime
    const mimeType = mime.getType(fileName);
    return mimeType || 'application/octet-stream'; // Default to binary stream if unknown
  }

  private buildFinalFileName(
    user: User,
    file: Express.Multer.File,
    fileType: FileType,
  ) {
    const extension = file.mimetype.split('/')[1];
    return `${user.id}-${fileType}.${extension}`;
  }
}
