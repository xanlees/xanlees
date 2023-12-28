import React from "react";
import {Layout} from "../index";

export default {
  title: "layout/admin/Layout",
  component: Layout,
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
  <Layout children={undefined}/>
);
