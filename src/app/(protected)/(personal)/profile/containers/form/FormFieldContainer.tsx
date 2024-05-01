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
import Captcha from "@src/shadcn/components/form/captcha-input";

export const FormFieldContainer: React.FC< CommonProps & { isEmployee: boolean } > = ({ form, isEmployee }) => {
  return (
    <>
      <Form.Field {...form} name="profilePicture" require={false}>
        <Form.FileInputImage className="w-64 h-64 pt-1" label="ເລືອກຮູບພາບ ຫຼື ເຊວຟີກໍໄດ້" iconImage={<CircleUser className="w-20 h-20" />} />
      </Form.Field>
      <div className="flex flex-wrap gap-2">
        <InputFullName form={form} />
        <InputNickName form={form} />
        <PhonNumberInput form={form} />
        <BirthdayInput form={form} />
        <UniqueNumberInput isEmployee={isEmployee} form={form}/>
        <GenderAndMaritalStatusSelect form={form} />
        <DynamicNumberForm isEmployee={isEmployee} {...form} />
      </div>
      <Form.Field {...form} name={"captcha"} label={"ຂ້ອນບໍ່ແມ່ນຄອມພິວເຕີ"}>
        <Captcha/>
      </Form.Field>
    </>
  );
};
export const BirthdayInput: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="birthday" label="ວັນ​ເດືອນ​ປີ​ເກີດ">
          <DatePickerField />
        </Form.Field>
      </div>
    </div>
  );
};
export const UniqueNumberInput: React.FC<CommonProps & { isEmployee?: boolean }> = ({ form, isEmployee }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="typeOfUniqueNumber" label="ປະເພດເອກກະສານຢືນຢັນ">
          <Form.Combobox
            {...(typeOfUniqueNumber as any)}
            className="w-full lg:w-80"
          />
        </Form.Field>
      </div>
    </div>
  );
};

export const GenderAndMaritalStatusSelect: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80">
      <div className="flex flex-col w-full lg:flex-row lg:gap-x-5">
        <Form.Field {...form} name={"gender"} label={"ເພດ"}>
          <Form.RadioGroup className="" options={[{ label: "ຊາຍ", value: "MALE" }, { label: "ຍິງ", value: "FEMALE" }]} isSquare={true} />
        </Form.Field>
        <Form.Field {...form} name={"maritalStatus"} label={"ສະຖານະພາບ"}>
          <Form.RadioGroup className="" options={[{ label: "ໂສດ", value: "SINGLE" }, { label: "ແຕ່ງງານແລ້ວ", value: "MARRIED" }]} isSquare={true} />
        </Form.Field>
      </div>
    </div>
  );
};

export const typeOfUniqueNumber = {
  options: [
    { label: "ເລກບັດປະຈໍາຕົວ", value: "IDENTIFY" },
    { label: "ປື້ມສໍາມະໂມຄົວເລກທີ", value: "CENSUS_BOOK" },
  ],
};
