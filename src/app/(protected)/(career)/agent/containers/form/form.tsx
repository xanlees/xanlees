/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines */
import React from "react";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";
import { type IFormConfig } from "../../interface/props";
import { Input } from "@src/shadcn/elements";
import { RadioGroupFiled } from "@src/shadcn/components/form/radio-group";
import { RadioGroupItem } from "@src/shadcn/elements/radio-group";
import { EditableBadgeField } from "@src/common/components/dynamicForm/renderBadge";
import { useFieldArray } from "react-hook-form";
import { DynamicForms } from "@src/common/components/dynamicForm/dynamicForm";
import { InputField } from "@src/common/components/dynamicForm/InputField";

export const ProfileForm: React.FC = () => {
  const { form } = useFormConfig();
  return (
    <div className="rounded-full w-96 sm:w-[710px] mx-20 ">
      <Form {...form}>
        <div className="font-bold text-2xl text-center text-gray-800 dark:text-white tracking-wide">
          ຂໍ້ມູນສ່ວນບຸກຄົນ
        </div>
        <InputContainer form={{ form }} />
        <div className="flex sm:flex-row flex-col gap-2 rounded-lg w-full sm:w-1/2 capitalize" />
      </Form>
    </div>
  );
};

interface CommonProps {
  form: IFormConfig
}

export const InputContainer: React.FC<CommonProps> = ({ form }) => {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <InputFullName form={form} />
        <InputNickName form={form} />
        <PhonNumberInput form={form} />
      </div>
      <div className="flex flex-wrap gap-2">
        <GenderSelect form={form} />
        <ContainerFooter form={form} />
      </div>
    </>
  );
};

const InputFullName: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"name"} label={"ຊື່​ ແລະ ນາມ​ສະ​ກຸນ"}>
          <Input className="w-full" placeholder="ທະວີສຸກ ມີນາລາວົງ" />
        </Form.Field>
      </div>
    </div>
  );
};

const InputNickName: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"name"} label={"ຊື່ຫຼື້ນ"}>
          <Input className="w-full" placeholder="ເປີ້ນ" />
        </Form.Field>
      </div>
    </div>
  );
};

const PhonNumberInput: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full  lg:w-80">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="phoneNumber" label="ເບີໂທ">
          <Input placeholder="20xxxxxxxx" />
        </Form.Field>
      </div>
    </div>
  );
};

const GenderSelect: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"gender"} label={"ເລືອກເພດ"}>
          <RadioGroupFiled className="flex w-full">
            <RadioGroupItem value="Male">ຊາຍ</RadioGroupItem>
            <RadioGroupItem value="Female">ຍິງ</RadioGroupItem>
          </RadioGroupFiled>
        </Form.Field>
      </div>
    </div>
  );
};

export const ContainerFooter: React.FC<CommonProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "blacklistNumber",
  });
  return (
    <>
      <InputField fields={fields} append={append} name="blacklistNumber" label="ອັນເລກ" placeholder="000" maxLength={3} numericOnly require={false} errorMessage="ເລກຊໍ້າ" />
      <EditableBadgeField remove={remove} name="blacklistNumber" {...form} />
      <DynamicForms {...form} fields={fields} append={append} remove={remove} name="blacklistNumber" className="hidden" />
    </>
  );
};
