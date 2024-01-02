/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type AxiosInstance } from "axios";
import { type DataProvider } from "@refinedev/core";
import getOneDataProvider from "@src/lib/provider/rest/lib/getOne";
import { axiosInstance } from "@refinedev/simple-rest/src/utils";
import { getSessionToken } from "./sessionToken";
const deleteOneDataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Omit<Required<DataProvider>, "createMany" | "updateMany" | "deleteMany"> => {
  // Start with the base dataProvider
  const baseDataProvider = getOneDataProvider(apiUrl, httpClient);
  // Add the custom getList method
  return {
    ...baseDataProvider, // Include the base methods
    deleteOne: async({ resource, id, variables, meta }) => {
      const url = `${apiUrl}/${resource}/${id}`;
      const headers = meta?.headers ?? {};
      const token = await getSessionToken(httpClient);

      if (token !== "") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        headers.Authorization = `Bearer ${token}`;
      }

      const { data } = await httpClient.delete(url, {
        data: variables, headers,
      });

      return {
        data,
      };
    },
  };
};

export default deleteOneDataProvider;
