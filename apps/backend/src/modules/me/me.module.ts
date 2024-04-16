import { Module, ModuleMetadata } from '@nestjs/common';
import { MeProfileController } from '#modules/me/me-profile.controller';
import { UploadModule } from '#modules/upload/upload.module';
import { FileUploadStorageModule } from '#core/FileUploadStorageModule/FileUploadStorage.module';

export const MeModuleMetadata: ModuleMetadata = {
  controllers: [MeProfileController],
  providers: [],
  imports: [UploadModule, FileUploadStorageModule],
  exports: [],
};

@Module(MeModuleMetadata)
export class MeModule {}
