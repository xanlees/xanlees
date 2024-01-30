"use client";
import "@/styles/globals.css";

import { NextAuthProvider } from "../lib/provider/auth/";
import { RefineProvider } from "../lib/provider/refine";
import { Suspense } from "react";
import Loading from "./loading";

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
        <Suspense fallback={<Loading />}>
          <NextAuthProvider>
            <RefineProvider>{children}</RefineProvider>
          </NextAuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
