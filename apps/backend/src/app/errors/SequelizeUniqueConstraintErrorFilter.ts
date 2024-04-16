import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { UniqueConstraintError } from 'sequelize';
import { Response } from 'express';
import { ErrorFilter } from './beans/ErrorFilter';
import { ErrorMessages } from './beans/ErrorMessages';

@Catch(UniqueConstraintError)
export class SequelizeUniqueConstraintErrorFilter
  extends ErrorFilter
  implements ExceptionFilter
{
  catch(exception: UniqueConstraintError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorException = new BadRequestException(
      ErrorMessages.ALREADY_EXISTS,
    );
    return response
      .status(errorException.getStatus())
      .json(errorException.getResponse());
  }
}
