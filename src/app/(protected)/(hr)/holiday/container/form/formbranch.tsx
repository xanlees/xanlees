import React from "react";
import { Form } from "@src/shadcn/components/form";
import { useBranchHolidayForm } from "../../hooks";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { useFieldArray } from "react-hook-form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { useBranchSelect } from "@src/app/(protected)/(career)";
import { useList, useSelect } from "@refinedev/core";

export const BranchHolidayForm: React.FC<{ id?: number }> = ({ id }) => {
  const { form } = useBranchHolidayForm({ id });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "holidayBranch" });
  const branch = useBranchSelect({ type: "OFFICE" });
  const holiday = useHolidaySelect();
  return (
    <div className="rounded-full w-72 sm:w-[600px] mx-12 p-10 my-3">
      <Form {...form}>
        <DynamicForm
          form={form} fields={fields} append={append} remove={remove} name="holidayBranch"
          className="flex flex-col sm:flex-row sm:flex-wrap" label="ເພີ່ມ"
          classNameButton="w-20  mt-5 mr-7">
          <ArrayField {...form} name="holiday" label="ວັນພັກ">
            <Form.Combobox {...(holiday as any)} />
          </ArrayField>
          <ArrayField {...form} name="branch" label="ສາຂາ">
            <Form.Combobox {...(branch as any)} />
          </ArrayField>
        </DynamicForm>
      </Form>
    </div>
  );
};
const useHolidaySelect = () => {
  const branch = useSelect({
    resource: "holiday",
    optionLabel: "name",
    optionValue: "id",
  });
  return branch;
};

export const BranchHolidayFormEdit: React.FC<{ id?: number }> = ({ id }) => {
  const holidayLiist = useHolidayLis({ holiday: id });
  return (
    <div className="rounded-full w-72 sm:w-[600px] mx-3 p-10 my-3 ">
      {holidayLiist?.map((item: any) => {
        return <BranchHoliday key={item.id} id={item.id} />;
      })}
    </div>
  );
};

export const BranchHoliday: React.FC<{ id?: number }> = ({ id }) => {
  const { form } = useBranchHolidayForm({ id });
  const branch = useBranchSelect({ type: "OFFICE" });
  const holiday = useHolidaySelect();
  return (
    <div className="rounded-full w-72 sm:w-[600px] p-10 my-3">
      <Form {...form}>
        <div className="flex flex-wrap gap-2">
          <div className="w-full lg:w-80 ">
            <div className="relative w-full mb-3">
              <Form.Field {...form} name="holiday" label="ປະເພດວັນພັກ">
                <Form.Combobox {...holiday} className="lg:w-80 " />
              </Form.Field>
            </div>
          </div>
          <div className="w-full lg:w-80 ">
            <div className="relative w-full mb-3">
              <Form.Field {...form} name="branch" label="ປະເພດວັນພັກ">
                <Form.Combobox {...branch} className="lg:w-80 "/>
              </Form.Field>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export function useHolidayLis({ holiday = 0 }: { holiday?: number }) {
  const { data } = useList({
    resource: "holiday/holiday-branch",
    errorNotification: false,
    filters: [
      { field: "holiday", operator: "eq", value: holiday },
      { field: "paginate", operator: "eq", value: false },
    ],
  });
  return data?.data ?? [];
}
