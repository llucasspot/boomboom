import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorMessages } from './ErrorMessages';
import { ApiErrorData } from './ApiErrorData.dto';

export abstract class ErrorFilter {
  protected readonly logger = new Logger(this.constructor.name);

  protected isHttpException(exception: unknown): exception is HttpException {
    return exception instanceof HttpException;
  }

  protected buildInternalServerErrorResponse(response: Response) {
    const internalServerErrorException = new InternalServerErrorException(
      ErrorMessages.INTERNAL_SERVER_ERROR,
    );
    const apiErrorData: ApiErrorData = {
      statusCode: internalServerErrorException.getStatus(),
      message: internalServerErrorException.message as ErrorMessages,
    };
    return response
      .status(internalServerErrorException.getStatus())
      .json(apiErrorData);
  }
}
