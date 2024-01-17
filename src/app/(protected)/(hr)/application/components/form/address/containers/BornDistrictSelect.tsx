import React from "react";
import { Form } from "@src/shadcn/components/form";
import { type IFormConfig } from "@src/common/interface";

export const BornDistrictSelect = ({ formConfig, district }: { formConfig: IFormConfig, district: any }) => (
  <Form.Field {...formConfig.form} name="bornDistrictId" label="ເລືອກເມືອງເກີດ" >
    <Form.Combobox
      {...(district)}
      className=""
    />
  </Form.Field>
);

