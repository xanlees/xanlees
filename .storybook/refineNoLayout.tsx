import restDataProvider from "@/lib/provider/data/custom";
import React from "react";
import { AuthBindings, HttpError, Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import { SessionProvider, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { getIdentity, getLogin, getLogout } from "@/lib/provider/auth/authOperation";
import {notificationProvider} from "@/lib/provider/notification"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CLIENT_API_V1_URL, CLIENT_API_URL } from "@/lib/client-constants";

export const RefineNoLayout = (Story: React.FC) => {
  const { data, status } = useSession();
  const to = usePathname();


  const authProvider: AuthBindings = {
    login: getLogin(to),
    logout: getLogout(),
    onError: async(error: HttpError | Error | undefined) => { return { error }; },
    check: async() => {
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/",
        };
      }
      return { authenticated: true };
    },
    getPermissions: async() => { return null; },
    getIdentity: async() => getIdentity(data),
  };
  const basePath=CLIENT_API_URL || "http://127.0.0.1:3000";

  return (
      <Refine
        dataProvider={restDataProvider(CLIENT_API_V1_URL as string)}
        routerProvider={routerProvider}
        authProvider={authProvider}
        notificationProvider={notificationProvider}
        resources={[
          {
            name: "user",
            list: "/user",
          },
          {
            name: "employee",
            list: "/employee",
          },
          {
            name: "position",
            list: "/position",
          },
        ]}
      >
        <SessionProvider basePath={`${basePath}/api/auth`}>
          <Story />
        </SessionProvider>
        <ToastContainer/>
      </Refine>
  );
};
