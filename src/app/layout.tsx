"use client";

import "@/styles/globals.css";

import { NextAuthProvider } from "../lib/provider/auth/";
import { RefineProvider } from "../lib/provider/refine";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <RefineProvider>{children}</RefineProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
