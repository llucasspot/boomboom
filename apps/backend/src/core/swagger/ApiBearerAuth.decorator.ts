import {
  ApiBearerAuth as SwaggerApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '#core/passport/jwt/jwt.guard';
import { Expose } from 'class-transformer';

class ApiUnauthorizedResponseErrorData {
  @Expose()
  message: string = 'Unauthorized';
  @Expose()
  statusCode: number = HttpStatus.UNAUTHORIZED;
}

export function ApiBearerAuth() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      type: ApiUnauthorizedResponseErrorData,
    }),
    SwaggerApiBearerAuth(),
    UseGuards(JwtAuthGuard),
  );
}
