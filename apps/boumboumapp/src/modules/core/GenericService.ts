import { LoggerService } from "#modules/core/logger/logger.service";

export abstract class GenericService {
  protected logger = LoggerService.create(this.constructor.name);

  init(): void | Promise<void> {
    this.logger.info("service init is called but was not overridden");
  }
}
