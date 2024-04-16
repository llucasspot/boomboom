import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { GenericService } from '#core/generic.service';

@Injectable()
export class ContentRangeInterceptor
  extends GenericService
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    const rangeString = request.query.range;
    const isValidRangeString = /^\[\d+(,\d+)*\]$/.test(rangeString);
    if (!isValidRangeString) {
      this.logger.log(`exception not HttpException`);
      return next.handle();
    }
    const range: number[] = JSON.parse(rangeString);
    return next.handle().pipe(
      tap((data: { data: unknown[] }) => {
        const itemsCount = data.data.length;
        response.set(
          'Content-Range',
          `items ${range[0]}-${range[1]}/${itemsCount}`,
        );
      }),
    );
  }
}
