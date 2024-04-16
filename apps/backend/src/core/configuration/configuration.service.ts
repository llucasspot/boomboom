import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
  static isProductionMode() {
    return process.env.NODE_ENV === 'production';
  }
}
