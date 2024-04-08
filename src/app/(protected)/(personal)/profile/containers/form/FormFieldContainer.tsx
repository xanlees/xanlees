import React from "react";
import { CircleUser } from "lucide-react";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { DynamicNumberForm } from "./inputUniqueNumber";
import { Form } from "@src/shadcn/components/form";
import { RadioGroupFiled } from "@src/shadcn/components/form/radio-group";
import { RadioGroupItem } from "@src/shadcn/elements/radio-group";
import { type CommonProps } from "@src/app/(protected)/(career)/agent/interface/props";
import {
  InputFullName,
  InputNickName,
  PhonNumberInput,
} from "@src/app/(protected)/(career)/agent/containers/form/fields";

export const FormFieldContainer: React.FC< CommonProps & { isEmployee: boolean } > = ({ form, isEmployee }) => {
  return (
    <>
      <Form.Field {...form} name="profilePicture">
        <Form.FileInputImage className="w-64 h-64 rounded-full p-0" label="ເລືອກຮູບພາບ ຫຼື ເຊວຟີກໍໄດ້" iconImage={<CircleUser className="h-20 w-20" />} />
      </Form.Field>
      <div className="flex flex-wrap gap-2">
        <InputFullName form={form} />
        <InputNickName form={form} />
        <PhonNumberInput form={form} />
        <BirthdayInput form={form} />
        <GenderSelect form={form} />
        <UniqueNumberInput isEmployee={isEmployee} form={form}/>
        <DynamicNumberForm isEmployee={isEmployee} {...form} />
      </div>
    </>
  );
};
const BirthdayInput: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="birthday" label="ເລືອກວັນ​ເດືອນ​ປີ​ເກີດ">
          <DatePickerField />
        </Form.Field>
      </div>
    </div>
  );
};
const UniqueNumberInput: React.FC<CommonProps & { isEmployee?: boolean }> = ({ form, isEmployee }) => {
  const typeOfUniqueNumber = uniqueNumber(isEmployee);
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field
          {...form}
          name="typeOfUniqueNumber"
          label="ເລືອກປະເພດເອກກະສານຢືນຢັນ"
        >
          <Form.Select options={typeOfUniqueNumber} className="w-full lg:w-80" />
        </Form.Field>
      </div>
    </div>
  );
};

const GenderSelect: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="w-full mb-3 flex gap-x-5">
        <Form.Field {...form} name={"gender"} label={"ເລືອກເພດ"}>
          <RadioGroupFiled className=" ">
            <RadioGroupItem value="MALE" className="">
              ຊາຍ
            </RadioGroupItem>
            <RadioGroupItem value="FEMALE">ຍິງ</RadioGroupItem>
          </RadioGroupFiled>
        </Form.Field>
        <Form.Field {...form} name={"maritalStatus"} label={"ສະຖານະພາບ"}>
          <RadioGroupFiled className=" ">
            <RadioGroupItem value="SINGLE" className="">
              ໂສດ
            </RadioGroupItem>
            <RadioGroupItem value="MARRIED">ແຕ່ງງານແລ້ວ</RadioGroupItem>
          </RadioGroupFiled>
        </Form.Field>
      </div>
    </div>
  );
};

function uniqueNumber(typeOfUniqueNumber: any, isEmployee?: boolean) {
  if (isEmployee ?? false) {
    return [
      { label: "ເລກເຄື່ອງຂາຍເລກ", value: "MACHINE" },
      { label: "ເລກບັດປະຈໍາຕົວ", value: "IDENTIFY" },
      { label: "ປື້ມສໍາມະໂມຄົວເລກທີ", value: "CENSUS_BOOK" },
    ];
  }
  return [
    { label: "ເລກບັດປະຈໍາຕົວ", value: "IDENTIFY" },
    { label: "ປື້ມສໍາມະໂມຄົວເລກທີ", value: "CENSUS_BOOK" },
  ];
}
