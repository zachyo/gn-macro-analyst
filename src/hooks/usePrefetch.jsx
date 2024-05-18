// import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
// import { prefetchFn } from "@/services/prefetched-queries/employeesPage";


export default function usePrefetch({ url, key, params }) {
  const query_client = useQueryClient();

//   useEffect(() => {
//     query_client.prefetchQuery(key, () =>
//       prefetchFn(url, {
//         queryParams: params,
//       })
//     );
//   }, []);

  //====gets the data from the cache ========
  const dataInCache = query_client.getQueryCache().find(key)?.state?.data;

  return { dataInCache };
}
