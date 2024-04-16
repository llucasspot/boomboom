export enum AuthStackScreenName {
  AUTH_HOME = "AuthScreen",
  OAUTH_SCREEN = "OauthViewScreen",
}

export type AuthStackParamsList = {
  [AuthStackScreenName.AUTH_HOME]: undefined;
  [AuthStackScreenName.OAUTH_SCREEN]: undefined;
};
