import React from "react";

import useSubmitService from "@/app/(auth)/login/service/submit";
import LoginForm from "../components/form";

export default {
  title: "Login",
  component: LoginForm,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/login",
      },
    },
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const form = () => {
  const onSubmit = useSubmitService();
  return <LoginForm onSubmit={onSubmit} />;
};
