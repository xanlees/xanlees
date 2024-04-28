"use client";

import { useAuth } from "@src/lib/provider/refine/context/auth";
import { ThemedLayoutV1 } from "@src/shadcn/components/themedLayoutV1";
import { ViteDarkModeProvider } from "@src/shadcn/providers";
import { useRouter } from "next/navigation";

export default function LoginLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  const router = useRouter();
  const authProvider = useAuth();

  authProvider.check()
    .then(({ authenticated }) => {
      if (authenticated) {
        router.push("/");
      }
    })
    .catch((error) => {
      console.error("Error checking authentication:", error);
    });

  return (
    <ThemedLayoutV1
      darkModeProvider={ViteDarkModeProvider}
      defaultDarkMode="light"
      storageKey="darkMode">
      {children}
    </ThemedLayoutV1>);
}
