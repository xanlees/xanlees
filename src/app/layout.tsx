"use client";

import "@/styles/globals.css";

import { NextAuthProvider } from "./(provider)/nextauth";
import { RefineProvider } from "./(provider)/refine/base";

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
