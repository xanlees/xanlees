import React from "react";

import { useBranchSelect } from "@career";
import { type IFormProp } from "@src/common/interface";
import { Form } from "@src/shadcn/components/form";
import { DatePickerWithRange } from "@src/shadcn/components/form/date-range-picker";
import { Input } from "@src/shadcn/elements";

import { useHolidayForm } from "../hooks";

export const HolidayForm: React.FC<{ id?: number }> = ({ id }) => {
  const { form } = useHolidayForm({ id });
  return (
    <div className="rounded-full w-72 sm:w-[700px]">
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
      <StartDateField form={form} />
      <BranchForm form={form} />
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

const StartDateField: React.FC<IFormProp> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="holidayDate" label="ວັນທີ">
          <DatePickerWithRange />
        </Form.Field>
      </div>
    </div>
  );
};

const BranchForm: React.FC<IFormProp> = ({ form }) => {
  const type = "HEADQUARTERS,OFFICE,BRANCH";
  const branchData = useBranchSelect({ type });
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="branch" label="ຫ້ອງການ (ຖ້າຕ້ອງສ້າງມື້ພັກສະເພາະຫ້ອງການ)">
          <Form.Combobox {...branchData as any} className="lg:w-80 " />
        </Form.Field>
      </div>
    </div>
  );
};

