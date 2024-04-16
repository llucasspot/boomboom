import { DependencyInjectionService } from "@boumboum/di";

export const diService = new DependencyInjectionService();

export const { singleton, inject, alias } = diService.buildSingletonDecorator();
