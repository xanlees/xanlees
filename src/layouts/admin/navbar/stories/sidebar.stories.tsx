import React from "react";
import Header from "../header";

export default {
  title: "layout/admin/header",
  component: Header,
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
  <Header/>
);
