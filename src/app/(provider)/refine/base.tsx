/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines-per-function */
/* eslint-disable  @typescript-eslint/require-await */
"use client";

import restDataProvider from "@/lib/provider/data/custom";
import { type AuthBindings, type HttpError, Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { authContext } from "./authContext";
import { getIdentity, getLogin, getLogout } from "@/lib/provider/auth/authOperation";
import { notificationProvider } from "@/lib/provider/notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { accessControlProvider } from "@/lib/provider/access/control";
import { ThemedLayoutV2 } from "@/shadcn/components/themedLayoutV2";
import { ViteDarkModeProvider } from "@/shadcn/providers";
import { resources } from "@src/lib/resources/constant";
import { Suspense } from "react";
import Loading from "@src/app/loading";

interface Props {
  children?: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RefineProvider = ({ children }: Props): JSX.Element => {
  const { data, status } = useSession();
  const to = usePathname();

  const authProvider: AuthBindings = {
    login: getLogin(to),
    logout: getLogout(),
    onError: async(error: HttpError | Error | undefined) => { return { error }; },
    check: async() => ({
      authenticated: status !== "unauthenticated",
      redirectTo: status === "unauthenticated" ? "/" : undefined,
    }),
    getPermissions: async() => { return null; },
    getIdentity: async() => getIdentity(data),
  };
  return (
    <authContext.Provider value={authProvider}>
      <Refine
        authProvider={authProvider}
        routerProvider={routerProvider}
        dataProvider={restDataProvider(process.env.NEXT_PUBLIC_API_URL as string)}
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
          <Suspense fallback={<Loading/>}>
            {children}
          </Suspense>
        </ThemedLayoutV2>
        <ToastContainer/>
      </Refine>
    </authContext.Provider>
  );
};
