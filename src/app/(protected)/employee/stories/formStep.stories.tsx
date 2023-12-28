import React from "react";
import { MultiStepForm } from '../components/multiForm';
export default {
  title: "employee/MultiStepForm",
  component: MultiStepForm,
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
  <MultiStepForm/>
);
