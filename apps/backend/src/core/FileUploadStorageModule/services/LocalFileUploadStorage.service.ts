import path from 'path';
import { promises as fs } from 'fs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { FileUploadStorageServiceI } from '#core/FileUploadStorageModule/services/FileUploadStorage.serviceI';
import { UploadConfig } from '#config/beans';
import { NoContentException } from '#app/errors/exceptions/no-content.exception';

@Injectable()
export class LocalFileUploadStorageService extends FileUploadStorageServiceI {
  constructor(private uploadConfig: UploadConfig) {
    super();
    // Ensure the directory exists (create if not)
    fs.mkdir(this.uploadConfig.uploadsFolder, { recursive: true })
      .then(() => {})
      .catch(console.log);
  }

  async upload(file: Express.Multer.File, fileName: string) {
    this.logger.log('uploadFile start');
    const filePath = this.resoleFilePath(fileName);
    await this.writeFile(filePath, file);
    this.logger.log('uploadFile end');
  }

  async serveFile(response: Response, fileName: string): Promise<void> {
    const filePath = this.resoleFilePath(fileName);
    try {
      await fs.access(filePath);
      response.sendFile(filePath);
    } catch (e) {
      console.log(e);
      throw new NoContentException();
    }
  }

  private async writeFile(filePath: string, file: Express.Multer.File) {
    try {
      await fs.writeFile(filePath, file.buffer, { flag: 'w' });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  private resoleFilePath(fileName: string) {
    return path.join(this.uploadConfig.uploadsFolder, fileName);
  }
}
