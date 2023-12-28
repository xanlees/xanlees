"use client";

import "@/styles/globals.css";

import { NextAuthProvider } from "./(provider)/nextauth";
import { RefineProvider } from "./(provider)/refine/base";
import { Layout } from "@src/layouts/admin";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {/* <Layout> */}
          <RefineProvider>{children}</RefineProvider>
          {/* </Layout> */}
        </NextAuthProvider>
      </body>
    </html>
  );
}
