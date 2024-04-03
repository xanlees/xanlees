import { type RedirectAction } from "@refinedev/core";
import { Form } from "@src/shadcn/components/form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Input, Label } from "@src/shadcn/elements";
import React, { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useFormConfig } from "./config";
import { usePositionSelect } from "./fields/select";

export const EmployeeForm = ({ redirect = "list", id }: { redirect: RedirectAction, id: number }) => {
  const formConfig = useFormConfig(redirect);
  const position = usePositionSelect();
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "employee" });
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      append({ profileId: id });
      setIsMounted(true);
      remove(1);
    }
  }, [isMounted]);
  return (
    <div className="flex flex-col border shadow-2xl rounded-2xl">
      <span className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">ຟອມສ້າງພະນັກງານ</span>
      <Form {...formConfig.form}>
        <DynamicForm form={formConfig.form} fields={fields} append={append} remove={remove} name="employee" label="ຕໍາແໜ່ງ" className="flex flex-row gap-2" classNameButton="mt-5" defaultConfig={{ profileId: id }}>
          <ArrayField {...formConfig.form} name="positionId" label="ຕໍາແໜ່ງ">
            <Form.Combobox {...(position as any)}/>
          </ArrayField>
          <ArrayField {...formConfig.form} name="joiningDate" label="ວັນທີ ເດືອນປີ ເຂົ້າວຽກ">
            <DatePickerField />
          </ArrayField>
          <ArrayField {...formConfig.form} name="isLatest" label="">
            <div className="flex gap-2 pt-3">
              <Input placeholder="isLatest" className="block w-5 h-5 rounded-lg" type="checkbox" defaultValue={"false"}/>
              <Label className="pt-2.5 ">{"ຕໍາແໜ່ງລ່າ​ສຸດ"}</Label>
            </div>
          </ArrayField>
        </DynamicForm>
      </Form>
    </div>
  );
};

