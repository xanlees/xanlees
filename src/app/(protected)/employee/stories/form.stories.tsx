import React from "react";
import { EmployeeForm } from "../components/form";

export default {
  title: "employee/EmployeeForm",
  component: EmployeeForm,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/employee",
      },
    },
  },
};
export const view = () => (
  <EmployeeForm redirect="create" />
);
