import React from "react";
import { useSelect, type RedirectAction } from "@refinedev/core";
import { Input } from "@src/shadcn/elements";
import { type IDistrict } from "../../../(career)/employee/interface";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";

interface PersonalAddressFormProps {
  redirect: RedirectAction
  setCurrentStep: any
}
interface IFormConfig {
  form: {
    setValue: any
  }
}

export const PersonalAddressForm: React.FC<PersonalAddressFormProps> = ({
  redirect,
  setCurrentStep,
}) => {
  const formConfig = useFormConfig(redirect, setCurrentStep);
  const district = useSelect<IDistrict>({
    resource: "district",
    optionLabel: "districtName",
    optionValue: "id",
    filters: [{ field: "pageSize", operator: "eq", value: 140 }],
  });
  return (
    <div className="flex flex-col w-full capitalize rounded-lg sm:w-1/2 sm:flex-row">
      <div className="flex-1 p-4">
        <Form {...formConfig.form}>
          <div className="flex flex-row w-full gap-x-48">
            <div className="block w-full">
              <InputBornVillage {...formConfig} name="bornVillage" label="Born Village" />
            </div>
            <div className="w-full">
              <InputBornVillage {...formConfig} name="currentVillage" label="Current Village"/>
            </div>
          </div>
          <div className="flex flex-row w-full gap-x-56">
            <InputBornDistrict formConfig={formConfig} district={district} />
            <CurrentDistrictId formConfig={formConfig} district={district} />
          </div>
        </Form>
      </div>
    </div>
  );
};

interface InputBornVillageProps extends IFormConfig {
  name: string
  label: string
}

const InputBornVillage: React.FC<InputBornVillageProps> = (props) => (
  <Form.Field {...props} name={props.name} label={props.label}>
    <Input placeholder={props.label} />
  </Form.Field>
);

const CurrentDistrictId = ({ formConfig, district }: { formConfig: IFormConfig, district: any }) => (
  <Form.Field {...formConfig.form} name="currentDistrictId" label="Current District" >
    <Form.Combobox
      {...(district)}
      onChange={(value) => {
        formConfig.form.setValue("currentDistrictId", value);
      }}
      className="mx-10"
    />
  </Form.Field>
);

const InputBornDistrict = ({ formConfig, district }: { formConfig: IFormConfig, district: any }) => (
  <Form.Field {...formConfig.form} name="bornDistrictId" label="Current Village" >
    <Form.Combobox
      {...(district)}
      onChange={(value) => {
        formConfig.form.setValue("bornDistrictId", value);
      }}
      className="mx-10"
    />
  </Form.Field>
);
