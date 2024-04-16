/* eslint-disable react-hooks/rules-of-hooks */
import { CreateOneProfileBodyGenderEnum } from "@boumboum/swagger-backend";
import { observable, useObservable } from "micro-observables";
import { ImageURISource } from "react-native";

import { singleton } from "#modules/core/di/di-utils";

export type RegistrationState = {
  profilePictureUri?: ImageURISource["uri"];
  fullName?: string;
  dateOfBirth?: Date;
  gender?: CreateOneProfileBodyGenderEnum;
  gendersToShow?: CreateOneProfileBodyGenderEnum[];
  description?: string;
};

export type StepperState = {
  step: number;
  numberOfSteps: number;
  isSubmitDisabled: boolean;
};

@singleton()
export class RegistrationStateManager {
  private REGISTRATION_STATE_RESET: RegistrationState = {};
  private _registrationState = observable<RegistrationState>(
    this.REGISTRATION_STATE_RESET,
  );
  private readonly registrationState = this._registrationState.readOnly();

  private STEPPER_STATE_RESET: StepperState = {
    step: 0,
    numberOfSteps: 1,
    isSubmitDisabled: true,
  };
  private _stepperState = observable<StepperState>(this.STEPPER_STATE_RESET);
  private readonly stepperState = this._stepperState.readOnly();

  useRegistrationState() {
    return useObservable(this.registrationState);
  }

  useStepperState() {
    return useObservable(this.stepperState);
  }

  isLastStep() {
    return (
      this.stepperState.get().step === this.stepperState.get().numberOfSteps - 1
    );
  }

  getProgression() {
    return (
      this.stepperState.get().step / (this.stepperState.get().numberOfSteps - 1)
    );
  }

  updateStepperState(updatedFields: Partial<StepperState>): void {
    this._stepperState.update((oldState) => {
      return {
        ...oldState,
        ...updatedFields,
      };
    });
  }

  updateRegistrationState(updatedFields: Partial<RegistrationState>): void {
    // @ts-ignore exception observable update
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
    this._stepperState.update(() => {
      return this.STEPPER_STATE_RESET;
    });
  }

  initState(numberOfSteps: number) {
    this.updateStepperState({
      numberOfSteps,
    });
  }
}
