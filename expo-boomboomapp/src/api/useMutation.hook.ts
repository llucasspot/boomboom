import { useNavigation } from "@react-navigation/core";
import type { DefaultError } from "@tanstack/query-core";
import {
  QueryClient,
  QueryKey,
  useMutation as useReactQueryMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

import ErrorService from "#services/ErrorService/ErrorService";
import { Logger } from "#services/LoggerService/LoggerServiceI";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { getGlobalInstance } from "#tsyringe/diUtils";

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
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>({
  mutationFn,
  onError,
  logger,
  i18nActionKey,
  invalidateQueries,
}: UseMutationProps<TData, TError, TVariables, TContext>) {
  const errorService = getGlobalInstance<ErrorService>(
    ServiceInterface.ErrorService,
  );
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useReactQueryMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    onError: async (error, variables, context) => {
      if (onError) {
        onError(error, variables, context);
      }
      logger.error(`${i18nActionKey} error`, error);
      logger.debug(`${i18nActionKey} variables`, variables);
      // @ts-ignore TODO handleError
      await errorService.handleError(error, navigation);
    },
    onSuccess: async () => {
      await invalideQueries(queryClient, invalidateQueries);
    },
  });
}

async function invalideQueries(
  queryClient: QueryClient,
  invalidateQueries: QueryKey,
) {
  if (Array.isArray(invalidateQueries[0])) {
    await Promise.all(
      invalidateQueries.map((invalidateQuerie) => {
        return queryClient.invalidateQueries({
          queryKey: invalidateQuerie as QueryKey,
        });
      }),
    );
  } else {
    await queryClient.invalidateQueries({
      queryKey: invalidateQueries,
    });
  }
}
