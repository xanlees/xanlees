import React from "react";
import PositionList from "../page";

export default {
  title: "position/positionList",
  component: PositionList,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/position",
      },
    },
  },
};

export const list = () => (
  <PositionList/>
);
