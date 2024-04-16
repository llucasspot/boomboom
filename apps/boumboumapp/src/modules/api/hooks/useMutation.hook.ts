import type { DefaultError } from "@tanstack/query-core";
import {
  QueryKey,
  useMutation as useReactQueryMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { invalideQueries } from "#modules/api/hooks/useMutation.utils";
import { diService } from "#modules/core/di/di-utils";
import { Logger } from "#modules/core/logger/logger.serviceI";
import { ToastService } from "#modules/core/toast/toast.service";

type UseMutationProps<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = Pick<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  "mutationFn" | "onError"
> & {
  logger: Logger;
  i18nActionKey: string;
  invalidateQueries: QueryKey;
};

export function useMutation<
  TError extends AxiosError<{ message: string }>,
  TData = unknown,
  TVariables = void,
  TContext = unknown,
>({
  mutationFn,
  onError,
  logger,
  i18nActionKey,
  invalidateQueries,
}: UseMutationProps<TData, TError, TVariables, TContext>) {
  const toastService = diService.getInstance(ToastService);
  const queryClient = useQueryClient();
  return useReactQueryMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    onError: async (error, variables, context) => {
      if (onError) {
        onError(error, variables, context);
      }
      logger.error(`${i18nActionKey} error :`, error);
      logger.debug(`${i18nActionKey} variables :`, variables);
    },
    onSuccess: async () => {
      toastService.success(`action.${i18nActionKey}.onSuccess`);
      await invalideQueries(queryClient, invalidateQueries);
    },
  });
}
