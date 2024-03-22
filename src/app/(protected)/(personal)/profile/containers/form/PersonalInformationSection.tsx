import React from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { type IFormConfig } from "../../interface/model";
import { DynamicNumberForm } from "./inputUniqueNumber";
import { maritalStatusOptions } from "@src/app/(protected)/(personal)/profile/containers/form/constant";

export const PersonalInformationSection: React.FC<{ formConfig: IFormConfig, isEmployee?: boolean }> = ({ formConfig, isEmployee }) => {
  return (
    <div className="flex-1 p-4 ">
      <Form.Field {...formConfig.form} name="nickname" label="ຊື່ຫຼິ້ນ">
        <Input placeholder="ຊື່ຫຼິ້ນ" />
      </Form.Field>
      <Form.Field
        {...formConfig.form}
        name="birthday"
        label="ເລືອກວັນ​ເດືອນ​ປີ​ເກີດ"
      >
        <DatePickerField />
      </Form.Field>
      <Form.Field {...formConfig.form} name="maritalStatus" label="ສະຖານະພາບ">
        <Form.Select options={maritalStatusOptions} />
      </Form.Field>
      <DynamicNumberForm formConfig={formConfig} isEmployee={isEmployee}/>
    </div>
  );
};
