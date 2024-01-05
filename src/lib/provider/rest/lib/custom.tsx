/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
/* eslint-disable  @typescript-eslint/no-unsafe-member-access  */
/* eslint-disable @typescript-eslint/naming-convention */

import { type AxiosRequestHeaders, type AxiosInstance, type AxiosResponse } from "axios";
import { stringify } from "query-string";
import { type DataProvider } from "@refinedev/core";
import deleteOneDataProvider from "./deleteOne";
import { axiosInstance, generateSort, generateFilter } from "@refinedev/simple-rest/src/utils";
import { getSessionToken } from "./sessionToken";

interface Option {
  method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch"
  httpClient: AxiosInstance
  apiUrl: string
  url: string
  requestUrl: string
  headers: AxiosRequestHeaders | { Authorization: string } | undefined
}
async function getResponse<TPayload>(options: Option, payload: TPayload): Promise<AxiosResponse> {
  const { method, httpClient, apiUrl, url, requestUrl } = options;
  const headers = options.headers as AxiosRequestHeaders;
  let axiosResponse;
  switch (method) {
    case "put":
    case "post":
    case "patch":
      axiosResponse = await httpClient[method](`${apiUrl}/${url}`, payload, { headers });
      break;
    case "delete":
      axiosResponse = await httpClient.delete(`${apiUrl}/${url}`, {
        data: payload, headers,
      });
      break;
    default:
      axiosResponse = await httpClient.get(requestUrl, { headers });
      break;
  }
  return axiosResponse;
}

async function configHeader(headers: undefined | { Authorization: string }, httpClient: AxiosInstance): Promise<boolean> {
  if (headers != null || headers !== undefined) {
    const token = await getSessionToken(httpClient);

    if (token !== "") {
      headers.Authorization = `Bearer ${token}`;
    }
    httpClient.defaults.headers = {
      ...httpClient.defaults.headers,
      ...headers,
    };
  }
  return true;
}

const CustomDataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Omit<Required<DataProvider>, "createMany" | "updateMany" | "deleteMany"> => {
  // Start with the base dataProvider
  const baseDataProvider = deleteOneDataProvider(apiUrl, httpClient);
  return {
    ...baseDataProvider, // Include the base methods
    custom: async({ url, method, filters, sorters, payload, query, headers }) => {
      let requestUrl = `${url}?`;

      if (sorters != null) {
        const generatedSort = generateSort(sorters);
        if (generatedSort != null) {
          const { _sort, _order } = generatedSort;
          const sortQuery = {
            _sort: _sort.join(","),
            _order: _order.join(","),
          };
          requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
        }
      }
      if (filters != null) {
        const filterQuery = generateFilter(filters);
        requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
      }
      if (query !== undefined) {
        requestUrl = `${requestUrl}&${stringify(query as Record<string, never>)}`;
      }
      await configHeader(headers as { Authorization: string }, httpClient);
      const axiosResponse = await getResponse({ method, httpClient, apiUrl, url, requestUrl, headers }, payload);
      const { data } = axiosResponse;

      return await Promise.resolve({ data });
    },
  };
};
export default CustomDataProvider;
