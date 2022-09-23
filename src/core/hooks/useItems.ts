import { useQuery, UseQueryResult } from "react-query";
import { apiClient } from "core/api";

import { Item } from "core/types";

export const useItems = (): UseQueryResult<Item[]> => {
  return useQuery(["items"], () =>
    apiClient.get("/items").then((res) => res.data)
  );
};
