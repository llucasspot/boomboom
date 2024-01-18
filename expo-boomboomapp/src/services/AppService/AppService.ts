import { inject, singleton } from "tsyringe";

import ServiceInterface from "../../tsyringe/ServiceInterface";
import AuthService from "../AuthService/AuthService";
import { GenericService } from "../GenericService";
import LanguageService from "../LanguageService/LanguageService";
import StyleService from "../StyleService/StyleService";

@singleton()
export default class AppService extends GenericService {
  constructor(
    @inject(ServiceInterface.StyleServiceI)
    private styleService: StyleService,
    @inject(ServiceInterface.LanguageServiceI)
    private languageService: LanguageService,
    @inject(ServiceInterface.AuthService)
    private authService: AuthService,
  ) {
    super();
  }

  async initialiseApplication(isDarkMode: boolean): Promise<void> {
    await this.styleService.initialiseService(isDarkMode);
    await this.languageService.initialiseService();
  }
}
