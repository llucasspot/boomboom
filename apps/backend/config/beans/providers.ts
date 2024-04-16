import { ClassProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { FileUploadStorageServiceI } from '#core/FileUploadStorageModule/services/FileUploadStorage.serviceI';
import { Dto } from '#core/beans/Dto';

export class FileUploadStorageServiceProviderConfig extends Dto<FileUploadStorageServiceProviderConfig> {
  provider: ClassProvider<FileUploadStorageServiceI>['useClass'];
}
