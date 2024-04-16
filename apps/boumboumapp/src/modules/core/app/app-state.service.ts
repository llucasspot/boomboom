/* eslint-disable react-hooks/rules-of-hooks */
import { observable, useObservable } from "micro-observables";

import { GenericService } from "../GenericService";

import { singleton } from "#modules/core/di/di-utils";

type AppState = {
  isDark: boolean;
};

@singleton()
export class AppStateService extends GenericService {
  private APP_STATE_RESET: AppState = {
    isDark: false,
  };

  private _app = observable<AppState>(this.APP_STATE_RESET);
  private readonly app = this._app.readOnly();

  useApp(): AppState {
    return useObservable(this.app);
  }

  setDark(isDark: boolean) {
    this._app.update((_app) => {
      return {
        ..._app,
        isDark,
      };
    });
  }
}
