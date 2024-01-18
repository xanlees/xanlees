"use client";
import "@/styles/globals.css";
import { RefineProvider } from "@src/lib/provider/refine";

export default function RootLayoutVisit({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body>
        <RefineProvider>{children}</RefineProvider>
      </body>
    </html>
  );
}
