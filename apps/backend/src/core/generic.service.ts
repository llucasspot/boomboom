import { Logger } from '@nestjs/common';

export abstract class GenericService {
  protected readonly logger = new Logger(this.constructor.name);
}
