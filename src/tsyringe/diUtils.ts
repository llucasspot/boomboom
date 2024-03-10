import { DependencyContainer, Lifecycle } from "tsyringe";
import { constructor } from "tsyringe/dist/typings/types";

import ServiceInterface from "./ServiceInterface";

type Injector = DependencyContainer;

let globalInjector: Injector | undefined;

export function configureGlobalInjector(injector: Injector): void {
  globalInjector = injector;
}

export function getGlobalInjector(): Injector | undefined {
  return globalInjector;
}

function checkGlobalInjector() {
  if (!globalInjector) {
    throw new Error(
      "Global injector is not defined, " +
        'you must call "configureGlobalInjector" before trying to use "getInstance"',
    );
  }
}

export function getGlobalInstance<T>(
  service: ServiceInterface | constructor<T>,
): T {
  checkGlobalInjector();
  return globalInjector!.resolve<T>(service);
}

export function injectSingleton<T>(
  token: string,
  provider: constructor<T>,
): void {
  checkGlobalInjector();
  globalInjector!.register<T>(token, provider, {
    lifecycle: Lifecycle.Singleton,
  });
}

export function injectValue<T>(token: string, provider: T): void {
  checkGlobalInjector();
  globalInjector!.register<T>(token, { useValue: provider });
}
