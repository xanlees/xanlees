import { ArrayField } from "@src/shadcn/components/form/array-field";
import React from "react";
import type { IFormConfig } from "@src/common/interface";
import { Input } from "@src/shadcn/elements/input";

export const DocumentNameInput = ({
  formConfig,
}: {
  formConfig: IFormConfig
}) => {
  return (
    <ArrayField {...formConfig.form} name="documentFile" label="ຊື່ເອກສະສານ">
      <Input placeholder="ຊື່ເອກສານ" className="w-64"/>
    </ArrayField>
  );
};
