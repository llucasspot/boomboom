import {inject, singleton} from 'tsyringe';
import ServiceInterface from '../../tsyringe/ServiceInterface';
import {Logger} from '../LoggerService/LoggerServiceI';
import LoggerService from '../LoggerService/LoggerService';
import StyleService from '../StyleService/StyleService';
import LanguageService from '../LanguageService/LanguageService';
import AuthService from "../AuthService/AuthService";

@singleton()
export default class AppService {
    private readonly logger: Logger;

    constructor(
        @inject(ServiceInterface.StyleServiceI)
        private styleService: StyleService,
        @inject(ServiceInterface.LanguageServiceI)
        private languageService: LanguageService,
        @inject(ServiceInterface.AuthService)
        private authService: AuthService,
        @inject(ServiceInterface.LoggerService)
        private loggerService: LoggerService,
    ) {
        this.logger = loggerService.create(AppService.name);
    }

    async initialiseApplication(isDarkMode: boolean): Promise<void> {
        await this.styleService.initialiseService(isDarkMode);
        await this.languageService.initialiseService();
        await this.authService.initialiseService()
    }
}
