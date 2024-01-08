import React from "react";
import BranchList from "../page";

export default {
  title: "Career/branch/branchList",
  component: BranchList,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/branch",
      },
    },
  },
};

export const list = () => (
  <BranchList/>
);
