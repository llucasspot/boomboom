import { Module, ModuleMetadata } from '@nestjs/common';
import { UploadService } from '#modules/upload/upload.service';
import { FileUploadStorageModule } from '#core/FileUploadStorageModule/FileUploadStorage.module';

export const UploadModuleMetadata: ModuleMetadata = {
  controllers: [],
  providers: [UploadService],
  imports: [FileUploadStorageModule],
  exports: [UploadService],
};

@Module(UploadModuleMetadata)
export class UploadModule {}
