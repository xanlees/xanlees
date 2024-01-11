import React from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import { type IFormConfig } from "../../interface";
import { genderOptions } from "@src/app/(protected)/(career)/employee/lib/constant";
import { typeOfUniqueNumber } from "../../lib/settings";

export const BasicInformationSection: React.FC<{ formConfig: IFormConfig }> = ({
  formConfig,
}) => {
  return (
    <div className="flex-1 p-4">
      <Form.Field
        {...formConfig.form}
        name="fullname"
        label="ຊື່​ ແລະ ນາມ​ສະ​ກຸນ"
      >
        <Input placeholder="ຊື່​ ແລະ ນາມ​ສະ​ກຸນ" />
      </Form.Field>
      <Form.Field {...formConfig.form} name="phoneNumber" label="ເບີໂທ">
        <Input placeholder="20xxxxxxx" />
      </Form.Field>
      <Form.Field {...formConfig.form} name="gender" label="ເລືອກເພດ">
        <Form.Select options={genderOptions} />
      </Form.Field>
      <Form.Field
        {...formConfig.form}
        name="typeOfUniqueNumber"
        label="ເລືອກປະເພດ"
      >
        <Form.Select options={typeOfUniqueNumber} />
      </Form.Field>
      <Form.Field
        {...formConfig.form}
        name="profilePicture"
        label="ເລືອກໂປຣໄຟລ໌"
      >
        <Form.FileInput />
      </Form.Field>
    </div>
  );
};
