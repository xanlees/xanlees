import React from "react";
import { useSelect } from "@refinedev/core";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";
import { InputBornVillage, BornDistrictSelect, CurrentDistrictSelect } from "../../containers";
import type { IDistrict } from "../../interface";
import { InputBase } from "@src/common/elements/input/InputBase";

interface PersonalAddressFormProps {
  setCurrentStep?: (step: number) => void
}

export const PersonalAddressForm: React.FC<PersonalAddressFormProps> = ({
  setCurrentStep,
}) => {
  const formConfig = useFormConfig({ setCurrentStep });
  const district = useSelect<IDistrict>({
    resource: "district",
    optionLabel: "districtName",
    optionValue: "id",
    filters: [{ field: "pageSize", operator: "eq", value: 140 }],
  });
  return (
    <div className="rounded-full w-96 sm:w-[38%] ">
      <Form {...formConfig.form}>
        <div className="flex flex-col w-full capitalize rounded-lg sm:w-1/2 sm:flex-row">
          <div className="flex-1 p-4">
            <InputBornVillage {...formConfig} name="bornVillage" label="ບ້ານເກີດ" />
            <BornDistrictSelect formConfig={formConfig} district={district} />
          </div>
          <div className="flex-1 p-4">
            <InputBornVillage {...formConfig} name="currentVillage" label="ບ້ານຢູ່ປະຈຸບັນ"/>
            <CurrentDistrictSelect formConfig={formConfig} district={district} />
            <InputBase {...formConfig} name="houseNo" label="ເຮືອນເລກທີ"/>
          </div>
        </div>
      </Form>
    </div>
  );
};
