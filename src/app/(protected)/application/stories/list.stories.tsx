import React from "react";
import Application from "../page";

export default {
  title: "application",
  component: Application,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/application",
      },
    },
  },
};

export const view = () => (
  <Application/>
);
