import React from "react";
import { FormGraduation } from "../components/form";

export default {
  title: "Personal/graduation/graduationCreate",
  component: FormGraduation,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/graduation",
      },
    },
  },
};

export const create = () => (
  <FormGraduation redirect={false}/>
);
