import React from "react";
import { type RedirectAction } from "@refinedev/core";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { useFormConfig } from "./config";
import {
  genderOptions,
  maritalStatusOptions,
} from "../../../(career)/employee/lib/constant";
import { typeOfUniqueNumber } from "../lib/settings";
import { DynamicNumberForm } from "../containers/form/inputUniqueNumber";
import { type IFormConfig } from "../interface";

interface ProfileFormProps {
  redirect: RedirectAction
  setCurrentStep?: (step: number) => void
  setProfileID?: (id: number) => void
}

const BasicInformationSection: React.FC<{
  formConfig: IFormConfig
}> = ({ formConfig }) => (
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
    <DynamicNumberForm formConfig={formConfig} />
    <Form.Field {...formConfig.form} name="profilePicture" label="ເລືອກໂປຣໄຟລ໌">
      <Form.FileInput />
    </Form.Field>
  </div>
);

const PersonalInformationSection: React.FC<{ formConfig: IFormConfig }> = ({
  formConfig,
}) => (
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
    <Form.Field
      {...formConfig.form}
      name="typeOfUniqueNumber"
      label="ເລືອກປະເພດ"
    >
      <Form.Select options={typeOfUniqueNumber} />
    </Form.Field>
  </div>
);

export const ProfileForm: React.FC<ProfileFormProps> = ({
  redirect,
  setCurrentStep,
  setProfileID,
}) => {
  const formConfig = useFormConfig({ redirect, setCurrentStep, setProfileID });
  return (
    <div className="w-[39%] rounded-full ">
      <Form {...formConfig.form}>
        <div className="flex flex-col w-full capitalize rounded-lg sm:w-1/2 sm:flex-row">
          <BasicInformationSection formConfig={formConfig} />
          <PersonalInformationSection formConfig={formConfig} />
        </div>
      </Form>
    </div>
  );
};
