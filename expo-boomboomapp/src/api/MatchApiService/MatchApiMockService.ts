import { singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { GetProfilesResponse, MatchApiServiceI } from "./MatchApiServiceI";
import { user_helena, user_isabella, user_jessica } from "../../mocks/mokes";

@singleton()
export class MatchApiMockService implements MatchApiServiceI {
  async getProfiles(): Promise<GetProfilesResponse> {
    const stackProfiles = [user_isabella, user_helena, user_jessica];
    return Promise.resolve({
      data: stackProfiles.map(({ user, songs }) => {
        return {
          user: {
            ...user,
            id: uuidv4(),
          },
          songs,
        };
      }),
    });
  }
}
