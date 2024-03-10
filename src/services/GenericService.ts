import LoggerService from "./LoggerService/LoggerService";

export abstract class GenericService {
  protected logger = LoggerService.create(this.constructor.name);
}
