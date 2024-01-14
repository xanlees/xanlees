import { Form } from "@src/shadcn/components/form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import React from "react";
import type { IFormConfig } from "@src/common/interface";

export const DocumentFileInput = ({ formConfig }: { formConfig: IFormConfig }) => {
  return (
    <ArrayField {...formConfig.form} name="documentName" label="ຊື່ເອກສະສານ">
      <Form.Field {...formConfig.form} name="documentName">
        <Form.FileInput />
      </Form.Field>
    </ArrayField>
  );
};
