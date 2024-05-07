import { Form } from "@src/shadcn/components/form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Input, Label } from "@src/shadcn/elements";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { useFormConfig } from "../../hook/useEmployeeForm";
import { usePositionSelect } from "../../hook/useSelect";
import { type IFormConfig } from "@src/common/interface";

export const EmployeeForm = ({ profileId, type, redirect }: { redirect?: string, profileId: string, type?: string }) => {
  const profile = Number(profileId);
  const { form } = useFormConfig({ type, profile, redirect });
  const position = usePositionSelect(type);
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "employee" });
  return (
    <Form {...form}>
      {type === "LOTTERY"
        ? (
          <PositionForm form={form} fields={fields} append={append} remove={remove} position={position} profile={profileId}/>)
        : (
          <Containers form={form} fields={fields} append={append} remove={remove} position={position} profile={profileId}/>)
      }
    </Form>
  );
};
interface PositionFormProps {
  form: IFormConfig
  fields: any
  append: any
  remove: any
  position: any
  profile: string
}
export const PositionForm = ({ form, fields, append, remove, position, profile }: PositionFormProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <DynamicForm form={form} fields={fields} append={append} remove={remove}
      name="employee" label="ໜ້າວຽກ" className="flex flex-wrap gap-2" classNameButton="mt-7 w-20" defaultConfig={{ profileId: Number(profile) }}>
      <ArrayField {...form} name="positionId" label="ໜ້າວຽກ">
        <Form.Combobox {...(position)} className="w-72" />
      </ArrayField>
      <ArrayField {...form} name="joiningDate" label="ວັນທີເດືອນປີຮັບໜ້າວຽກ ">
        <DatePickerField className="w-72" />
      </ArrayField>
      <ArrayField {...form} name="isLatest" label="">
        <div className="flex gap-2 pt-5">
          <Input placeholder="isLatest" className="block w-5 h-5 rounded-lg" type="checkbox" defaultValue={"false"}/>
          <Label className="pt-2.5 ">{"ໜ້າວຽກລ່າ​ສຸດ"}</Label>
        </div>
      </ArrayField>
    </DynamicForm>
  );
};

export const Containers = ({ form, fields, append, remove, position, profile }: PositionFormProps) => {
  return (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <DynamicForm form={form} fields={fields} append={append} remove={remove} name="employee" label="ເພີ່ມຕຳແໜ່ງ" className="flex flex-wrap gap-2" classNameButton="mt-7 w-20" defaultConfig={{ profileId: Number(profile) }}>
      <ArrayField {...form} name="positionId" label="ຕໍາແໜ່ງ">
        <Form.Combobox {...(position)} className="w-72" />
      </ArrayField>
      <ArrayField {...form} name="joiningDate" label="ວັນທີ ເດືອນປີ ເຂົ້າວຽກ">
        <DatePickerField className="w-72" />
      </ArrayField>
      <ArrayField {...form} name="salary" label="ເງິນເດືອນ">
        <div className="w-full lg:w-72 ">
          <div className="relative w-full mb-3">
            <Input placeholder="3,000,000" className="80" type="currency" numericOnly/>
          </div>
        </div>
      </ArrayField>
      <ArrayField {...form} name="isLatest" label="">
        <div className="flex gap-2 pt-5">
          <Input placeholder="isLatest" className="block w-5 h-5 rounded-lg" type="checkbox" defaultValue={"false"}/>
          <Label className="pt-2.5 ">{"ຕໍາແໜ່ງລ່າ​ສຸດ"}</Label>
        </div>
      </ArrayField>
    </DynamicForm>
  );
};
