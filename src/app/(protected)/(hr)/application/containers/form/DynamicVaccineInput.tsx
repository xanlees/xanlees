/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Input } from "@src/shadcn/elements";
import { useFieldArray } from "react-hook-form";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { ArrayField } from "@src/shadcn/components/form/array-field";

interface IFormConfig {
  form: {
    control: any
    setValue: any
  }
}
export const DynamicVaccineInput: React.FC<{ formConfig: IFormConfig }> = ({
  formConfig,
}) => {
  const { fields, append } = useFieldArray({
    control: formConfig.form.control,
    name: "typeVaccine",
  });
  return (
    <div>
      <div>ທ່ານໄດ້ຮັບຢາວັກຊີນຫຍັງ</div>
      <DynamicForm
        form={formConfig.form}
        fields={fields}
        append={append}
        name="typeVaccine"
        label={"ປະເພດວັກຊີນ"}
      >
        <ArrayField
          {...formConfig.form}
          name="typeVaccine"
        >
          <Input placeholder={"ປະເພດວັກຊີນ"} className="block w-56"/>
        </ArrayField>
      </DynamicForm>
    </div>
  );
};
