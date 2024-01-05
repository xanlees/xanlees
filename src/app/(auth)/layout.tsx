/* eslint-disable @typescript-eslint/naming-convention */
"use client";

import { useAuth } from "@src/lib/provider/refine/context/auth";
import { useRouter } from "next/navigation";
import type React from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }): React.ReactNode {
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

  return children;
}
