import React from "react";
import BranchCreate from "../create/page";


export default {
  title: "Career/branch/branchCreate",
  component: BranchCreate,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/branch",
      },
    },
  },
};

export const create = () => (
  <BranchCreate/>
);
