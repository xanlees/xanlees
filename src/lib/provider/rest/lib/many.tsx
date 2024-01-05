/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type AxiosInstance, type AxiosResponse } from "axios";
import { stringify } from "query-string";
import { type DataProvider } from "@refinedev/core";
import getListDataProvider from "./list";
import { axiosInstance } from "@refinedev/simple-rest/src/utils";
import { getSessionToken } from "./sessionToken";

interface Response {
  results: []
}
const getManyDataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Omit<Required<DataProvider>, "createMany" | "updateMany" | "deleteMany"> => {
  const baseDataProvider = getListDataProvider(apiUrl, httpClient);

  return {
    ...baseDataProvider, // Include the base methods
    getMany: async({ resource, ids, meta }) => {
      const headers = meta?.headers ?? {};
      const token = await getSessionToken(httpClient);

      if (token !== "") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        headers.Authorization = `Bearer ${token}`;
      }
      const { data }: AxiosResponse<Response> = await httpClient.get(`${apiUrl}/${resource}?${stringify({ id: ids })}`, { headers });

      return {
        data: data.results,
      };
    },
  };
};
export default getManyDataProvider;
