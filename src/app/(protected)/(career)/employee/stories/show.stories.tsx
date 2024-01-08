import React from "react";
import Show from "../page";

export default {
  title: "Career/employee/show",
  component: Show,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/employee",
      },
    },
  },
};

export const show = () => <Show />;
