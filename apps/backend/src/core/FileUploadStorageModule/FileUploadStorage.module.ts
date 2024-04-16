import { Module, ModuleMetadata, Provider } from '@nestjs/common';
import { ConfigurationModule } from '#core/configuration/configuration.module';
import { FileUploadStorageServiceI } from '#core/FileUploadStorageModule/services/FileUploadStorage.serviceI';

const fileUploadStorageProviders: Provider[] = [
  {
    provide: FileUploadStorageServiceI,
    useClass: ConfigurationModule.getFileUploadStorageServiceProvider(),
  },
];

export const FileUploadStorageModuleMetadata: ModuleMetadata = {
  controllers: [],
  providers: [...fileUploadStorageProviders],
  imports: [ConfigurationModule],
  exports: [FileUploadStorageServiceI],
};

@Module(FileUploadStorageModuleMetadata)
export class FileUploadStorageModule {}
