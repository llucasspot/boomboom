import { StackProfileI } from "../ProfileApiService/ProfileApiServiceI";

export type GetProfilesResponse = { data: StackProfileI[] };

export abstract class MatchApiServiceI {
  abstract getProfiles(): Promise<GetProfilesResponse>;
}
