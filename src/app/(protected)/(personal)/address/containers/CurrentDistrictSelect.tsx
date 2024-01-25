import React from "react";
import { Form } from "@src/shadcn/components/form";
import { type IFormConfig } from "@src/common/interface";

export const CurrentDistrictSelect = ({ formConfig, district }: { formConfig: IFormConfig, district: any }) => (
  <Form.Field {...formConfig.form} name="currentDistrictId" label="ເລືອກເມືອງຢູ່ປະຈຸບັນ" >
    <Form.Combobox
      {...(district)}
      className=""
    />
  </Form.Field>
);

