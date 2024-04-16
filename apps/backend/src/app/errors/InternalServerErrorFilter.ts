import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ErrorFilter } from './beans/ErrorFilter';
import { Response } from 'express';

@Catch()
export class InternalServerErrorFilter
  extends ErrorFilter
  implements ExceptionFilter
{
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    this.logger.error(exception, exception.stack);
    if (!this.isHttpException(exception)) {
      this.logger.log(`exception not HttpException`);
      return this.buildInternalServerErrorResponse(response);
    }
    return response.status(exception.getStatus()).json(exception.getResponse());
  }
}
