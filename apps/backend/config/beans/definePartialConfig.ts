import { RecursivePartial } from './index';
import { DefaultConfiguration } from '#config/beans/defineConfig';

export type PartialConfiguration = RecursivePartial<DefaultConfiguration>;

export function definePartialConfig(
  config: PartialConfiguration,
): PartialConfiguration {
  return config;
}
