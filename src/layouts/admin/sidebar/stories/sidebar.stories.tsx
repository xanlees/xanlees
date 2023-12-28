import React from "react";
import Sidebar from "../sidebar";

export default {
  title: "layout/admin/sidebar",
  component: Sidebar,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/layout",
      },
    },
  },
};
export const view = () => (
  <Sidebar/>
);
