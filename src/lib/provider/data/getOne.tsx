/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type AxiosInstance } from "axios";
import { type DataProvider } from "@refinedev/core";
import updateDataProvider from "@/lib/provider/data/update";
import { axiosInstance } from "@refinedev/simple-rest/src/utils";
import { getSessionToken } from "./sessionToken";
const getOneDataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Omit<Required<DataProvider>, "createMany" | "updateMany" | "deleteMany"> => {
  // Start with the base dataProvider
  const baseDataProvider = updateDataProvider(apiUrl, httpClient);

  // Add the custom getList method
  return {
    ...baseDataProvider, // Include the base methods
    getOne: async({ resource, id, meta }) => {
      const url = `${apiUrl}/${resource}/${id}`;
      const headers = meta?.headers ?? {};
      const token = await getSessionToken(httpClient);

      if (token !== "") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        headers.Authorization = `Bearer ${token}`;
      }
      const { data } = await httpClient.get(url, { headers });
      return {
        data,
      };
    },
  };
};
export default getOneDataProvider;
