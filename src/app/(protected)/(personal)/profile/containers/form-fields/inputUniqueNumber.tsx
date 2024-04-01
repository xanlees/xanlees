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
export const DynamicNumberForm: React.FC<{ formConfig: IFormConfig, isEmployee?: boolean }> = ({
  formConfig, isEmployee,
}) => {
  const { fields, append, remove } = useFieldArray({
    control: formConfig.form.control,
    name: "uniqueNumber",
  });
  const type: string | undefined = formConfig.form.watch("typeOfUniqueNumber");
  const classNames = type != null ? "cursor-pointer" : "pointer-events-none";
  const displayText = getTypeDisplayText(type, isEmployee);
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

const getTypeDisplayText = (type: string | undefined, isEmployee?: boolean): string => {
  if (isEmployee === true) {
    switch (type) {
      case "IDENTIFY":
        return "ເລກບັດປະຈໍາຕົວ";
      case "CENSUS_BOOK":
        return "ປື້ມສໍາມະໂມຄົວເລກທີ";
      case "MACHINE":
        return "ເລກເຄື່ອງຂາຍເລກ";
      default:
        return "ເລືອກລະຫັດ";
    }
  } else {
    switch (type) {
      case "IDENTIFY":
        return "ເລກບັດປະຈໍາຕົວ";
      case "CENSUS_BOOK":
        return "ປື້ມສໍາມະໂມຄົວເລກທີ";
      default:
        return "ເລກບັດປະຈໍາຕົວ";
    }
  }
};
