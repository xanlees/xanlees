import React from "react";
import { CircleUser } from "lucide-react";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { DynamicNumberForm } from "./inputUniqueNumber";
import { Form } from "@src/shadcn/components/form";
import { type CommonProps } from "@src/app/(protected)/(career)/agent/interface/props";
import {
  InputFullName,
  InputNickName,
  PhonNumberInput,
} from "@src/app/(protected)/(career)/agent/containers/form/fields";

export const FormFieldContainer: React.FC< CommonProps & { isEmployee: boolean } > = ({ form, isEmployee }) => {
  return (
    <>
      <Form.Field {...form} name="profilePicture" require={false}>
        <Form.FileInputImage className="w-64 h-64 pt-1" label="ເລືອກຮູບພາບ ຫຼື ເຊວຟີກໍໄດ້" iconImage={<CircleUser className="h-20 w-20" />} />
      </Form.Field>
      <div className="flex flex-wrap gap-2">
        <InputFullName form={form} />
        <InputNickName form={form} />
        <PhonNumberInput form={form} />
        <BirthdayInput form={form} />
        <GenderAndMaritalStatusSelect form={form} />
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

const GenderAndMaritalStatusSelect: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80">
      <div className="w-full flex flex-col lg:flex-row lg:gap-x-5">
        <Form.Field {...form} name={"gender"} label={"ເລືອກເພດ"}>
          <Form.RadioGroup className="" options={[{ label: "ຊາຍ", value: "MALE" }, { label: "ຍິງ", value: "FEMALE" }]} isSquare={true} />
        </Form.Field>
        <Form.Field {...form} name={"maritalStatus"} label={"ສະຖານະພາບ"}>
          <Form.RadioGroup className="" options={[{ label: "ໂສດ", value: "SINGLE" }, { label: "ແຕ່ງງານແລ້ວ", value: "MARRIED" }]} isSquare={true} />
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
