import { observable, useObservable } from "micro-observables";
import { inject, singleton } from "tsyringe";

import ServiceInterface from "../../tsyringe/ServiceInterface";
import { GenericService } from "../GenericService";
import LanguageService from "../LanguageService/LanguageService";
import StyleService from "../StyleService/StyleService";

type AppState = {
  isAuthenticated: boolean;
  isProfileComplete: boolean;
};

@singleton()
export default class AppService extends GenericService {
  private APP_STATE_RESET: AppState = {
    isAuthenticated: false,
    isProfileComplete: false,
  };

  private _app = observable<AppState>(this.APP_STATE_RESET);
  private readonly app = this._app.readOnly();

  useApp(): AppState {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useObservable(this.app);
  }

  authenticateApp() {
    this._app.update((_app) => {
      return {
        ..._app,
        isAuthenticated: true,
      };
    });
  }

  completeProfile() {
    this._app.update((_app) => {
      return {
        ..._app,
        isProfileComplete: true,
      };
    });
  }

  constructor(
    @inject(ServiceInterface.StyleServiceI)
    private styleService: StyleService,
    @inject(ServiceInterface.LanguageServiceI)
    private languageService: LanguageService,
  ) {
    super();
  }

  async initialiseApplication(isDarkMode: boolean): Promise<void> {
    await this.styleService.initialiseService(isDarkMode);
    await this.languageService.initialiseService();
  }
}
