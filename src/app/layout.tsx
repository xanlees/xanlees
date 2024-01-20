"use client";
import "@/styles/globals.css";

import { NextAuthProvider } from "../lib/provider/auth/";
import { RefineProvider } from "../lib/provider/refine";
import { RefineProviderVisitor } from "@src/lib/provider/refine/index-vistor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body>
        <NextAuthProvider>
          <RefineProvider>{children}</RefineProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
