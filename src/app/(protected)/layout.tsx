"use client";

import { Authenticated } from "@refinedev/core";
import { ThemedLayoutV2 } from "@src/shadcn/components/themedLayoutV2";
import { ViteDarkModeProvider } from "@src/shadcn/providers";

export default function ProtectedLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <ThemedLayoutV2
      darkModeProvider={
        ViteDarkModeProvider
      }
      defaultDarkMode="light"
      storageKey="darkMode"
    >
      <Authenticated redirectOnFail="/login" key='login' v3LegacyAuthProviderCompatible>{children}</Authenticated>;
    </ThemedLayoutV2>
  );
}
