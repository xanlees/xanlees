"use client";

import { ThemedLayoutV1 } from "@src/shadcn/components/themedLayoutV1";
import { ViteDarkModeProvider } from "@src/shadcn/providers";

export default function ExposedLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <ThemedLayoutV1
      darkModeProvider={
        ViteDarkModeProvider
      }
      defaultDarkMode="light"
      storageKey="darkMode"
      showLogin={true}
    >
      {children}
    </ThemedLayoutV1>
  );
}
