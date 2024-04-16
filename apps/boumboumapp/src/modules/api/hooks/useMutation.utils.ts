import { QueryClient, QueryKey } from "@tanstack/react-query";

export async function invalideQueries(
  queryClient: QueryClient,
  invalidateQueries: QueryKey,
) {
  if (Array.isArray(invalidateQueries[0])) {
    await Promise.all(
      invalidateQueries.map((invalidateQuery) => {
        return queryClient.invalidateQueries({
          queryKey: invalidateQuery as QueryKey,
        });
      }),
    );
  } else {
    await queryClient.invalidateQueries({
      queryKey: invalidateQueries,
    });
  }
}
