import React from "react";
import { useSelect, type RedirectAction } from "@refinedev/core";
import { Input } from "@src/shadcn/elements";
import { type IDistrict } from "../../../(career)/employee/interface";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";
import { type IFormConfig } from "@src/common/interface";

interface PersonalAddressFormProps {
  redirect: RedirectAction
  setCurrentStep: any
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
    <div className="w-[39%] rounded-full ">
      <Form {...formConfig.form}>
        <div className="flex flex-col w-full capitalize rounded-lg sm:w-1/2 sm:flex-row">
          <div className="flex-1 p-4">
            <InputBornVillage {...formConfig} name="bornVillage" label="ບ້ານເກີດ" />
            <InputBornDistrict formConfig={formConfig} district={district} />
          </div>
          <div className="flex-1 p-4">
            <InputBornVillage {...formConfig} name="currentVillage" label="ບ້ານຢູ່ປະຈຸບັນ"/>
            <CurrentDistrictId formConfig={formConfig} district={district} />
          </div>
        </div>
      </Form>
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
  <Form.Field {...formConfig.form} name="currentDistrictId" label="ເລືອກເມືອງເກີດ" >
    <Form.Combobox
      {...(district)}
      className=""
    />
  </Form.Field>
);

const InputBornDistrict = ({ formConfig, district }: { formConfig: IFormConfig, district: any }) => (
  <Form.Field {...formConfig.form} name="bornDistrictId" label="ເລືອກເມືອງຢູ່ປະຈຸບັນ" >
    <Form.Combobox
      {...(district)}
    />
  </Form.Field>
);
