import { useQuery, UseQueryResult } from "react-query";
import { apiClient } from "core/api";
import { useSearchParams } from "react-router-dom";

import { Item } from "core/types";

export const useItems = (): UseQueryResult<Item[]> => {
  const [search] = useSearchParams();

  return useQuery(
    ["items", search.toString()],
    () => apiClient.get("/items", { params: search }).then((res) => res.data),
    {
      staleTime: 12000,
    }
  );
};
