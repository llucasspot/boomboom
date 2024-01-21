import { singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { MatchApiServiceI } from "./MatchApiServiceI";
import { user_helena, user_isabella, user_jessica } from "../../mocks/mokes";
import { StackProfileI } from "../ProfileApiService/ProfileApiServiceI";

@singleton()
export class MatchApiMockService implements MatchApiServiceI {
  async getProfiles(): Promise<StackProfileI[]> {
    const stackProfiles = [user_isabella, user_helena, user_jessica];
    return Promise.resolve(
      stackProfiles.map(({ user, songs }) => {
        return {
          user: {
            ...user,
            id: uuidv4(),
          },
          songs,
        };
      }),
    );
  }
}
