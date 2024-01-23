"use client";

import { Authenticated } from "@refinedev/core";
import { ThemedLayoutV2 } from "@/shadcn/components/themedLayoutV2";
import { ViteDarkModeProvider } from "@/shadcn/providers";
import Loading from "@src/app/loading";
import { Suspense } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <ThemedLayoutV2
      darkModeProvider={
        ViteDarkModeProvider
      }
      defaultDarkMode="light"
      storageKey="darkMode"
    >
      <Suspense fallback={<Loading />}>
        <Authenticated redirectOnFail="/login" key='login' v3LegacyAuthProviderCompatible>{children}</Authenticated>
      </Suspense>
    </ThemedLayoutV2>
  );
}
