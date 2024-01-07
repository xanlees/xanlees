import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react';

import { AuthBindings, HttpError, Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router/app';

import { getIdentity, getLogin, getLogout } from '../src/lib/provider/auth/authOperation';
import { RestDataProvider } from '../src/lib/provider/rest/';
import { notificationProvider } from '../src/shadcn/providers';

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
  const basePath=process.env.NEXTAUTH_URL || "http://127.0.0.1:3000";

  return (
      <Refine
        dataProvider={RestDataProvider(process.env.NEXT_PUBLIC_API_URL as string)}
        routerProvider={routerProvider}
        authProvider={authProvider}
        notificationProvider={notificationProvider}
        resources={[
          {
            name: "user",
            list: "/user",
          },
        ]}
      >
        <SessionProvider basePath={`${basePath}/api/auth`}>
          <Story />
        </SessionProvider>
      </Refine>
  );
};