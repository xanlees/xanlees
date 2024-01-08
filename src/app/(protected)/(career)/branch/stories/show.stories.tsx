import React from "react";
import BranchShow from "../show/[id]/page";




export default {
  title: "Career/branch/branchShow",
  component: BranchShow,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/branch",
      },
    },
  },
};

export const show = () => (
  <BranchShow params={{
    id: 1
  }}/>
);
