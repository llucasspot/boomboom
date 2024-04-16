import { Dto } from '#core/beans/Dto';

export class OauthStrategyProfile<
  TJson extends {
    display_name: string;
    id: string;
    email: string;
  } = {
    display_name: string;
    id: string;
    email: string;
  },
> {
  _json: TJson;
}

export class OauthStrategyValidateResult<
  TOauthStrategyProfile extends OauthStrategyProfile = OauthStrategyProfile,
> extends Dto<OauthStrategyValidateResult> {
  providerName: string;
  accessToken: string;
  refreshToken: string;
  profile: TOauthStrategyProfile;
}

export abstract class OauthStrategy<
  TOauthStrategyProfile extends OauthStrategyProfile,
> {
  abstract validate(
    accessToken: string,
    refreshToken: string,
    profile: TOauthStrategyProfile,
    done: (
      err: Error | undefined,
      user: OauthStrategyValidateResult<TOauthStrategyProfile> | undefined,
      info?: object,
    ) => void,
  ): void;
}
