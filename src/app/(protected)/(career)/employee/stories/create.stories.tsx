import React from "react";
import EmployeeCreate from "../create/[id]/page";

export default {
  title: "Career/employee/EmployeeCreate",
  component: EmployeeCreate,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/employee",
      },
    },
  },
};

export const create = () => (
  <EmployeeCreate params={{
    id: 1,
  }}/>
);
