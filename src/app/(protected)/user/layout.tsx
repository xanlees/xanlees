"use client";

import { Authenticated } from "@refinedev/core";

export default function ProtectedLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return <Authenticated redirectOnFail="/login" key='login' v3LegacyAuthProviderCompatible>{children}</Authenticated>;
}
