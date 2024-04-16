import Toast, { ToastOptions } from "react-native-toast-message";

import { singleton, inject } from "#modules/core/di/di-utils";
import { LanguageService } from "#modules/core/language/language.service";

@singleton()
export class ToastService {
  constructor(@inject(LanguageService) private i18nService: LanguageService) {}

  success(message: string, options?: ToastOptions) {
    return Toast.show({
      type: "success",
      text2: this.i18nService.translate(message),
      ...options,
    });
  }

  error(message: string, options?: ToastOptions) {
    return Toast.show({
      type: "error",
      text2: this.i18nService.translate(message),
      ...options,
    });
  }

  info(message: string, options?: ToastOptions) {
    return Toast.show({
      type: "info",
      text2: this.i18nService.translate(message),
      ...options,
    });
  }
}
