"use client";
import "@/styles/globals.css";
import { RefineProviderVisitor } from "@src/lib/provider/refine/index-vistor";

export default function RootLayoutVisit({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body>
        <RefineProviderVisitor>{children}</RefineProviderVisitor>
      </body>
    </html>
  );
}
