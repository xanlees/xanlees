import React from "react";

import { type IFormProp } from "@src/common/interface";
import { Form } from "@src/shadcn/components/form";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { Input } from "@src/shadcn/elements";

import { useHolidayForm } from "../hooks";
import { DatePickerWithRange } from "@src/shadcn/components/form/date-range-picker";

interface ProfileFormProps {
  id?: number
}

export const HolidayForm: React.FC<ProfileFormProps> = ({ id }) => {
  const { form } = useHolidayForm({ id });
  console.log("form", form.watch());
  return (
    <div className="rounded-full w-72 sm:w-[700px]">
      <Form {...form}>
        <Form.Field {...form} name="leaveDate" label="ມື້ເລີ່ມ">
          <DatePickerWithRange />
        </Form.Field>
        <div className="text-2xl font-bold tracking-wide text-center text-gray-800 dark:text-white">
            ຂໍ້ມູນສ່ວນບຸກຄົນ
        </div>
        <FormFieldContainer form={{ form }}/>
        <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:flex-row sm:w-1/2" />
      </Form>
    </div>
  );
};

const FormFieldContainer: React.FC< IFormProp> = ({ form }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <HolidayNameField form={form} />
      <StartDateField form={form} />
      <EndDateField form={form}/>
    </div>
  );
};
const HolidayNameField: React.FC<IFormProp> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"holidayName"} label={"ກະລຸໃສຊື່ມື້ພັກ"}>
          <Input className="w-full" placeholder="ວັນກຳມະກ່ອນ" />
        </Form.Field>
      </div>
    </div>
  );
};

const StartDateField: React.FC<IFormProp> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="startDate" label="ມື້ເລີ່ມ">
          <DatePickerField />
        </Form.Field>
      </div>
    </div>
  );
};

const EndDateField: React.FC<IFormProp> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="endDate" label="ມື້ຈົບມື້ຈົບ">
          <DatePickerField />
        </Form.Field>
      </div>
    </div>
  );
};
