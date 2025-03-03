import React from "react";

import { type IFormProp } from "@src/common/interface";
import { Form } from "@src/shadcn/components/form";
import { DatePickerWithRange } from "@src/shadcn/components/form/date-range-picker";
import { Input, Textarea } from "@src/shadcn/elements";
import { useHolidayForm } from "../../hooks";

export const HolidayForm: React.FC<{ id?: number }> = ({ id }) => {
  const { form } = useHolidayForm({ id });
  return (
    <div className="rounded-full w-72 sm:w-[600px] mx-12 p-10 my-3  ">
      <Form {...form}>
        <FormFieldContainer form={{ form }}/>
        <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:flex-row sm:w-1/2" />
      </Form>
    </div>
  );
};

const FormFieldContainer: React.FC<IFormProp> = ({ form }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <HolidayNameField form={form} />
      <DecriptionField form={form} />
      <DateField form={form} />
      <TypeForm form={form} />
    </div>
  );
};

const HolidayNameField: React.FC<IFormProp> = ({ form }) => {
  return (
    <div className="w-full">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"holidayName"} label={"ກະລຸໃສຊື່ມື້ພັກ"}>
          <Input className="w-full" placeholder="ວັນກຳມະກ່ອນ" />
        </Form.Field>
      </div>
    </div>
  );
};

const DecriptionField: React.FC<IFormProp> = ({ form }) => {
  return (
    <div className="w-full">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"description"} label={"ກະລຸໃສລາຍລະອຽດວັນພັກ"}>
          <Textarea className="w-full" rows={5} placeholder="ແມ່ນວັນກຳມະກ່ອນ" />
        </Form.Field>
      </div>
    </div>
  );
};

const DateField: React.FC<IFormProp> = ({ form }) => {
  return (
    <div className="w-full lg:w-60 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="holidayDate" label="ວັນທີ">
          <DatePickerWithRange />
        </Form.Field>
      </div>
    </div>
  );
};

const TypeForm: React.FC<IFormProp> = ({ form }) => {
  const options = [
    { value: "every_year", label: "ວັນພັກນີ້ໃຊ້ທຸກປີ" },
    { value: "one_year", label: "ວັນພັກນີ້ສະເພາະປີ້ນີ້" },
    { value: "branch_specific", label: "ວັນພັກນີ້ສະເພາະສາຂາ" },
  ];
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="type" label="ປະເພດວັນພັກ">
          <Form.Select options={options} className="lg:w-56 "/>
        </Form.Field>
      </div>
    </div>
  );
};
