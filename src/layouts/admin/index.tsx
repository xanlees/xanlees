/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import Header from "@src/layouts/admin/navbar/header";
import Sidebar from "@src/layouts/admin/sidebar/sidebar";
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden border-collapse">
        <Sidebar />
        <main className="flex-1 pt-16 pb-1 overflow-x-hidden overflow-y-auto bg-secondary/10">
          {children}
        </main>
      </div>
    </>
  );
};
