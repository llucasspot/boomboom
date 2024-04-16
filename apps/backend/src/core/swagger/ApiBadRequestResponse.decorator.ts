import { ApiBadRequestResponse as SwaggerApiBadRequestResponse } from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { Dto } from '#core/beans/Dto';
import { Nested } from '#core/decorators/Nested';
import { Expose } from 'class-transformer';

export class Constraints extends Dto<ApiBadRequestErrorMessage> {
  @Expose()
  whitelistValidation: string;
  @Expose()
  maxLength: string;
}

export class ApiBadRequestErrorMessage extends Dto<ApiBadRequestErrorMessage> {
  @Nested(() => Constraints)
  constraints: Constraints;
  property: string;
}

class ApiBadRequestErrorData {
  @Nested(() => ApiBadRequestErrorMessage)
  message: ApiBadRequestErrorMessage[];
  @Expose()
  error: 'Bad Request"';
  @Expose()
  statusCode: HttpStatus.BAD_REQUEST;
}

export function ApiBadRequestResponse() {
  return applyDecorators(
    SwaggerApiBadRequestResponse({
      type: ApiBadRequestErrorData,
    }),
  );
}
