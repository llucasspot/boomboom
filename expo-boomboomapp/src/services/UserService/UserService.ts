import {observable, useObservable} from 'micro-observables';
import {singleton} from 'tsyringe';
import {UserState} from './userServiceI';

@singleton()
export default class UserService {
  private USER_STATE_RESET: UserState = {
    isConnected: false,
  };

  private _user = observable<UserState>(this.USER_STATE_RESET);
  private readonly user = this._user.readOnly();

  getUserState(): UserState {
    return this.user.get();
  }

  useUser(): UserState {
    return ((): UserState => useObservable(this.user))();
  }

  updateUserState(updatedFields: Partial<UserState>): void {
    this._user.update(oldUser => {
      return {
        ...oldUser,
        ...updatedFields,
      };
    });
  }

  resetUserState(): void {
    this._user.update(() => {
      return this.USER_STATE_RESET;
    });
  }
}
