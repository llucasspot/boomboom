import { ApiNoContentResponse as SwaggerApiNoContentResponse } from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { Expose } from 'class-transformer';

class ApiNoContentResponseErrorData {
  @Expose()
  message: string = 'No Content';
  @Expose()
  error: 'No Content';
  @Expose()
  statusCode: HttpStatus.NO_CONTENT;
}

export function ApiNoContentResponse() {
  return applyDecorators(
    SwaggerApiNoContentResponse({
      type: ApiNoContentResponseErrorData,
    }),
  );
}
