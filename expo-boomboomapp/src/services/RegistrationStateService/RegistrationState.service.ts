/* eslint-disable react-hooks/rules-of-hooks */
import { observable, useObservable } from "micro-observables";
import { singleton } from "tsyringe";

import { RegistrationState } from "#services/RegistrationStateService/RegistrationState.service.interface";

@singleton()
export default class RegistrationStateService {
  private REGISTRATION_STATE_RESET: RegistrationState = null;
  private _registrationState = observable<RegistrationState>(
    this.REGISTRATION_STATE_RESET,
  );
  private readonly registrationState = this._registrationState.readOnly();

  useRegistrationState(): RegistrationState {
    return useObservable(this.registrationState);
  }

  updateRegistrationState(updatedFields: Partial<RegistrationState>): void {
    // @ts-ignore observable update
    this._registrationState.update((oldState) => {
      return {
        ...oldState,
        ...updatedFields,
      };
    });
  }

  reset(): void {
    this._registrationState.update(() => {
      return this.REGISTRATION_STATE_RESET;
    });
  }
}
