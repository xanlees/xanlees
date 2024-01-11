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
export const DynamicNumberForm: React.FC<{ formConfig: IFormConfig }> = ({
  formConfig,
}) => {
  const { fields, append } = useFieldArray({
    control: formConfig.form.control,
    name: "uniqueNumber",
  });
  return (
    <div className="mt-2">
      <DynamicForm
        form={formConfig.form}
        fields={fields}
        append={append}
        name="uniqueNumber"
        label="uniqueNumber"
      >
        <ArrayField
          {...formConfig.form}
          name="uniqueNumber"
          label="uniqueNumber"
        >
          <Input placeholder="uniqueNumber" className="block w-56" />
        </ArrayField>
      </DynamicForm>
    </div>
  );
};
