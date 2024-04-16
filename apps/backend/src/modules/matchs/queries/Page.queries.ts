import { Dto } from '#core/beans/Dto';
import { IsNumberString } from 'class-validator';

export class PageQueries extends Dto<PageQueries> {
  @IsNumberString()
  page?: number = 1;
}
