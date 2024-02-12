"use client";

import { Authenticated } from "@refinedev/core";
import { ThemedLayoutV2 } from "@src/shadcn/components/themedLayoutV2";
import { ViteDarkModeProvider } from "@src/shadcn/providers";
import { useSession } from "next-auth/react";

export default function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>): React.ReactNode {
  useSession();
  return (
    <ThemedLayoutV2
      darkModeProvider={
        ViteDarkModeProvider
      }
      defaultDarkMode="light"
      storageKey="darkMode"
    >
      <Authenticated redirectOnFail="/login" key='login' v3LegacyAuthProviderCompatible>{children}</Authenticated>
    </ThemedLayoutV2>
  );
}
