import { ErrorMessages } from './ErrorMessages';
import { Expose } from 'class-transformer';
import { Dto } from '#core/beans/Dto';

export abstract class ApiErrorData extends Dto<ApiErrorData> {
  @Expose()
  statusCode: number;
  @Expose()
  error?: string;
  @Expose()
  message: ErrorMessages;
}
