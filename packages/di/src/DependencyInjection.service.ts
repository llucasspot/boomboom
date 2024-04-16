import {container, DependencyContainer, inject, injectable, Lifecycle} from 'tsyringe';
import {constructor} from 'tsyringe/dist/typings/types';
import InjectionToken from "tsyringe/dist/typings/providers/injection-token";

export class DependencyInjectionService {
    private injector: DependencyContainer;

    constructor(dependencyContainer?: DependencyContainer) {
        this.injector = dependencyContainer ?? container.createChildContainer();
    }

    getInjector(): DependencyContainer {
        return this.injector;
    }

    setInjector(dependencyContainer: DependencyContainer): void {
        this.injector = dependencyContainer;
    }

    getInstance<T>(token: InjectionToken<T>): T {
        return this.injector.resolve<T>(token);
    }

    registerSingleton<T>(
        token: constructor<T> | string,
        provider: constructor<T>,
    ): void {
        this.injector.registerSingleton<T>(token, provider);
    }

    buildSingletonDecorator() {
        return {
            singleton: this.singleton.bind(this),
            alias: this.alias.bind(this),
            inject: inject,
        }
    }

    private singleton<T>(): (target: constructor<T>) => void {
        return (target: constructor<T>): void => {
            injectable()(target);
            this.injector.registerSingleton(target);
        };
    }

    private alias(alias: any): (target: any) => void {
        return (target: any): void => {
            this.injector.register(
                target,
                {
                    useToken: alias
                },
                {lifecycle: Lifecycle.Singleton}
            );
        };
    }
}
