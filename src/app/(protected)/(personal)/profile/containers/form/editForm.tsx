
import React from "react";
import { Form } from "@src/shadcn/components/form";
import { InputFullName, InputNickName, PhonNumberInput } from "@src/app/(protected)/(career)/agent/containers/form/fields";
import { CircleUser } from "lucide-react";
import { type CommonProps } from "@src/app/(protected)/(career)/agent/interface/props";
import { BirthdayInput, GenderAndMaritalStatusSelect, UniqueNumberInput } from "./FormFieldContainer";
import { Input } from "@src/shadcn/elements";
import { useProfileEditForm } from "../../hooks/form/useProfileEditForm";

export const ProfileEditForm: React.FC = () => {
  const { form } = useProfileEditForm();
  return (
    <Form {...form}>
      <FormFieldContainer form={{ form }} isEmployee={true} />
    </Form>
  );
};

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
        <UniqueNumber form={form}/>
        <ProfileType isEmployee={isEmployee} form={form}/>
      </div>
    </>
  );
};

export const UniqueNumber: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"uniqueNumber"} label={"ເລກລະຫັດເອກກະສານຢືນຢັນ"}>
          <Input className="w-full" placeholder="ເລກລະຫັດເອກກະສານຢືນຢັນ" />
        </Form.Field>
      </div>
    </div>
  );
};

export const ProfileType: React.FC<CommonProps & { isEmployee?: boolean }> = ({ form, isEmployee }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="type" label="ສະຖານະພະນັກງານ">
          <Form.Combobox
            {...(profileTypeList as any)}
            className="w-full lg:w-80"
          />
        </Form.Field>
      </div>
    </div>
  );
};
export const profileTypeList = {
  options: [
    { label: "ລາອອກເອງ", value: "RESIGN" },
    { label: "ບໍລິສັດໃຫ້ອອກ", value: "DISMISS" },
    { label: "ພະນັກງານ", value: "EMPLOYEE" },
  ],
};
