import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  PayloadTooLargeException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorFilter } from './beans/ErrorFilter';
import { FileUploadStorageServiceI } from '#core/FileUploadStorageModule/services/FileUploadStorage.serviceI';

@Catch(PayloadTooLargeException)
export class MulterPayloadTooLargeExceptionFilter
  extends ErrorFilter
  implements ExceptionFilter
{
  catch(exception: PayloadTooLargeException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return this.buildMulterErrorResponse(
      FileUploadStorageServiceI.UPLOAD_LIMIT_FILE_SIZE_ERROR,
      response,
    );
  }

  private buildMulterErrorResponse(errorMessage: string, response: Response) {
    const errorException = new BadRequestException(errorMessage);
    return response
      .status(errorException.getStatus())
      .json(errorException.getResponse());
  }
}
