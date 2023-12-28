import React from "react";
import EmployeeList from "../page";

export default {
  title: "employee/EmployeeList",
  component: EmployeeList,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/employee",
      },
    },
  },
};

export const list = () => (
  <EmployeeList/>
);
