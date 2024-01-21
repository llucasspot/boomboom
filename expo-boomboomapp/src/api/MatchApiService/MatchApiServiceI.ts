import { StackProfileI } from "../ProfileApiService/ProfileApiServiceI";

export abstract class MatchApiServiceI {
  abstract getProfiles(): Promise<StackProfileI[]>;
}
