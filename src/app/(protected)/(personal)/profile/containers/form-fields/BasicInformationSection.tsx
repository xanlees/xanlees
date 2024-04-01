import React from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import { genderOptions } from "@src/app/(protected)/(personal)/profile/containers/form/constant";
import { type IFormConfig } from "../../interface/props";

export const BasicInformationSection: React.FC<{ formConfig: IFormConfig, isEmployee?: boolean }> = ({ formConfig, isEmployee }) => {
  const typeOfUniqueNumber = uniqueNumber(isEmployee);
  return (
    <div className="flex-1 p-4">
      <Form.Field {...formConfig.form} name="fullname" label="ຊື່​ ແລະ ນາມ​ສະ​ກຸນ" >
        <Input placeholder="ຊື່​ ແລະ ນາມ​ສະ​ກຸນ" />
      </Form.Field>
      <Form.Field {...formConfig.form} name="phoneNumber" label="ເບີໂທ">
        <Input placeholder="20xxxxxxx" />
      </Form.Field>
      <Form.Field {...formConfig.form} name="gender" label="ເລືອກເພດ">
        <Form.Select options={genderOptions} />
      </Form.Field>
      <Form.Field {...formConfig.form} name="typeOfUniqueNumber" label="ເລືອກປະເພດ">
        <Form.Select options={typeOfUniqueNumber} />
      </Form.Field>
      <Form.Field {...formConfig.form} name="profilePicture" label="ເລືອກໂປຣໄຟລ໌" >
        <Form.FileInputImage />
      </Form.Field>
    </div>
  );
};

function uniqueNumber(typeOfUniqueNumber: any, isEmployee?: boolean) {
  if (isEmployee ?? false) {
    return [
      {
        label: "ເລກເຄື່ອງຂາຍເລກ",
        value: "MACHINE",
      },
      {
        label: "ເລກບັດປະຈໍາຕົວ",
        value: "IDENTIFY",
      },
      {
        label: "ປື້ມສໍາມະໂມຄົວເລກທີ",
        value: "CENSUS_BOOK",
      },
    ];
  }
  return [
    {
      label: "ເລກບັດປະຈໍາຕົວ",
      value: "IDENTIFY",
    },
    {
      label: "ປື້ມສໍາມະໂມຄົວເລກທີ",
      value: "CENSUS_BOOK",
    },
  ];
}

