/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import FormLayout from "./layout/formLayout";
import Form from "./components/form";
import { type TSubmitFunc } from "@/app/(auth)/login/interface/interface";

const LoginFormTemplate = ({ onSubmit }: { onSubmit: TSubmitFunc }) => {
  return (
    <FormLayout>
      <Form onSubmit={onSubmit } />
    </FormLayout>
  );
};

export default LoginFormTemplate;
