import React from "react";
import { DynamicForms, InputField, RenderBadge } from "@src/common/components/dynamicForm";
import { Form } from "@src/shadcn/components/form";
import { Input } from "@src/shadcn/elements";
import { RadioGroupFiled } from "@src/shadcn/components/form/radio-group";
import { RadioGroupItem } from "@src/shadcn/elements/radio-group";
import { useFieldArray } from "react-hook-form";
import { type ExtendedFieldArrayProps, type CommonProps } from "../../interface/props";

export const InputContainer: React.FC<CommonProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({ control: form?.control, name: "uniqueNumber" });
  return (
    <>
      <Form.Field {...form} name="profilePicture">
        <Form.FileInputImage className="w-64 h-64 rounded-full p-0"/>
      </Form.Field>
      <div className="flex flex-wrap gap-2">
        <InputFullName form={form} />
        <InputNickName form={form} />
        <PhonNumberInput form={form} />
        <InputUniqueNumber fields={fields} append={append} remove={remove} form={form}/>
      </div>
      <div className="flex flex-wrap gap-2">
        <GenderSelect form={form} />
        <ContainerFooter form={form} fields={fields} append={append} remove={remove} />
      </div>
    </>
  );
};

export const InputFullName: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"fullname"} label={"ຊື່​ ແລະ ນາມ​ສະ​ກຸນ"}>
          <Input className="w-full" placeholder="ທະວີສຸກ ມີນາລາວົງ" />
        </Form.Field>
      </div>
    </div>
  );
};

export const InputNickName: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"nickname"} label={"ຊື່ຫຼື້ນ"} require={false}>
          <Input className="w-full" placeholder="ເປີ້ນ" />
        </Form.Field>
      </div>
    </div>
  );
};

export const PhonNumberInput: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="phoneNumber" label="ເບີໂທ">
          <Input placeholder="20xxxxxxxx" />
        </Form.Field>
      </div>
    </div>
  );
};

export const GenderSelect: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"gender"} label={"ເລືອກເພດ"}>
          <RadioGroupFiled className="flex w-full">
            <RadioGroupItem value="MALE">ຊາຍ</RadioGroupItem>
            <RadioGroupItem value="FEMALE">ຍິງ</RadioGroupItem>
          </RadioGroupFiled>
        </Form.Field>
      </div>
    </div>
  );
};

export const InputUniqueNumber: React.FC<ExtendedFieldArrayProps> = ({ append, fields }) => {
  return (
    <div className="w-full lg:w-80">
      <div className="relative w-full mb-3">
        <InputField fields={fields} append={append} name="uniqueNumber" label="ລະຫັດເຄຶ່ອງ" placeholder="000" maxLength={15} numericOnly require={false} errorMessage="ເລກຊໍ້າ" />
      </div>
    </div>
  );
};

export const ContainerFooter: React.FC<ExtendedFieldArrayProps> = ({ form, append, fields, remove }) => {
  return (
    <>
      <RenderBadge remove={remove} name="uniqueNumber" {...form} className=" grid grid-cols-3" />
      <DynamicForms {...form} fields={fields} append={append} remove={remove} name="uniqueNumber" className="hidden" />
    </>
  );
};
