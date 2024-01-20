/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines-per-function */
/* eslint-disable  @typescript-eslint/require-await */
"use client";

import { accessControlProvider } from "@/lib/provider/access/";
import { getIdentity, getLogin, getLogout } from "@/lib/provider/auth/authOperation";
import { ThemedLayoutV2 } from "@/shadcn/components/themedLayoutV2";
import { ViteDarkModeProvider, notificationProvider } from "@/shadcn/providers";
import Loading from "@src/app/loading";
import { Refine, type AuthBindings, type HttpError } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import { RestDataProvider } from "@src/lib/provider/rest/";
import { resources } from "@src/lib/resources/constant";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Suspense, useMemo } from "react";
import { authContext } from "./context/auth";
import "moment/locale/lo";

interface Props {
  children?: React.ReactNode
}

export const RefineProvider = ({ children }: Props): JSX.Element => {
  const { data, status } = useSession();
  const to = usePathname();

  const authProvider: AuthBindings = useMemo(() => {
    return {
      login: getLogin(to),
      logout: getLogout(),
      onError: async(error: HttpError | Error | undefined) => ({ error }),
      check: async() => ({
        authenticated: status !== "unauthenticated",
        redirectTo: status === "unauthenticated" ? "/" : undefined,
      }),
      getPermissions: async() => null,
      getIdentity: async() => getIdentity(data),
    };
  }, [to, status, data]);
  return (
    <authContext.Provider value={authProvider}>
      <Refine
        authProvider={authProvider}
        routerProvider={routerProvider}
        dataProvider={RestDataProvider(process.env.NEXT_PUBLIC_API_URL as string)}
        notificationProvider={notificationProvider}
        accessControlProvider={accessControlProvider}
        resources={resources}
        options={{
          syncWithLocation: true,
        }}>
        <ThemedLayoutV2
          darkModeProvider={
            ViteDarkModeProvider
          }
          defaultDarkMode="light"
          storageKey="darkMode"
        >
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </ThemedLayoutV2>
      </Refine>
    </authContext.Provider>
  );
};
