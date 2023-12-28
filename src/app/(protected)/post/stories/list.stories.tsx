import React from "react";
import Post from "../page";

export default {
  title: "post",
  component: Post,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/post",
      },
    },
  },
};

export const view = () => (
  <Post/>
);
