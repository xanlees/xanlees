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
    watch: any
  }
}
export const DynamicNumberForm: React.FC<{ formConfig: IFormConfig }> = ({
  formConfig,
}) => {
  const { fields, append, remove } = useFieldArray({
    control: formConfig.form.control,
    name: "uniqueNumber",
  });
  const type: string | undefined = formConfig.form.watch("typeOfUniqueNumber");
  const classNames = type != null ? "cursor-pointer" : "pointer-events-none";
  const displayText = getTypeDisplayText(type);
  return (
    <div className={classNames}>
      {<div className="pt-2">{displayText}</div>}
      <DynamicForm
        form={formConfig.form}
        fields={fields}
        append={append}
        remove={remove}
        name="uniqueNumber"
        label={displayText}
        classNameButton="mt-2"
      >
        <ArrayField
          {...formConfig.form}
          name="uniqueNumber"
          className="flex"
        >
          <Input placeholder={displayText} className="block w-56" />
        </ArrayField>
      </DynamicForm>
    </div>
  );
};

const getTypeDisplayText = (type: string | undefined): string => {
  if (type === "IDENTIFY") {
    return "ເລກບັດປະຈໍາຕົວ";
  } else if (type === "CENSUS_BOOK") {
    return "ປື້ມສໍາມະໂມຄົວເລກທີ";
  } else if (type === "MACHINE") {
    return "ເລກເຄື່ອງຂາຍເລກ";
  }
  return "ເລືອກລະຫັດ";
};
