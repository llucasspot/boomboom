import { Dto } from '#core/beans/Dto';

export class OauthConfig extends Dto<OauthConfig> {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  successURL: string;
}
