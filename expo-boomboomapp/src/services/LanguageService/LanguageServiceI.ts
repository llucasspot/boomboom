export enum SupportedLanguages {
  'EN' = 'en',
  'FR' = 'fr',
}

export type I18nI = {
  t: (string: string) => string;
};
