/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines-per-function */
/* eslint-disable  @typescript-eslint/require-await */
"use client";

import { accessControlProvider } from "@/lib/provider/access/";
import { ThemedLayoutV2 } from "@src/shadcn/components/themedLayoutV2/ThemedLayoutV2";
import { ViteDarkModeProvider, notificationProvider } from "@/shadcn/providers";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";
import Loading from "@src/app/loading";
import { RestDataProvider } from "@src/lib/provider/rest/";
import { resources } from "@src/lib/resources/constant";
import { Suspense } from "react";
import "moment/locale/lo";

interface Props {
  children?: React.ReactNode
}

export const RefineProviderVisitor = ({ children }: Props): JSX.Element => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={RestDataProvider(process.env.NEXT_PUBLIC_API_URL as string)}
      notificationProvider={notificationProvider}
      accessControlProvider={accessControlProvider}
      resources={resources}
      options={{
        syncWithLocation: true,
      }}>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </Refine>
  );
};
