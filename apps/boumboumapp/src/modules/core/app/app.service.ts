import { GenericService } from "../GenericService";

import { AppStateService } from "#modules/core/app/app-state.service";
import { inject, singleton } from "#modules/core/di/di-utils";
import { LanguageService } from "#modules/core/language/language.service";

@singleton()
export class AppService extends GenericService {
  constructor(
    @inject(LanguageService)
    private languageService: LanguageService,
    @inject(AppStateService)
    private appStateService: AppStateService,
  ) {
    super();
    this.initialiseApplication()
      .then(() => {})
      .catch(this.logger.error);
  }

  async initialiseApplication(): Promise<void> {
    await this.languageService.init();
  }

  useAppState() {
    return this.appStateService.useApp();
  }
}
