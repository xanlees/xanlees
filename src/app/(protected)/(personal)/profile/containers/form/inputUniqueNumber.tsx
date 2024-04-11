/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Input } from "@src/shadcn/elements";
import { useFieldArray } from "react-hook-form";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { type Control, type FieldValues, type UseFormSetValue, type UseFormWatch } from "react-hook-form";

export interface IFormConfig {
  setValue?: UseFormSetValue<FieldValues>
  watch?: UseFormWatch<FieldValues>
  control?: Control<FieldValues>
}
export const DynamicNumberForm: React.FC<{ form: IFormConfig, isEmployee?: boolean }> = ({
  form, isEmployee,
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "uniqueNumber",
  });
  const type = form?.watch ? form.watch("typeOfUniqueNumber") as FieldValues : undefined;
  const classNames = type != null ? "cursor-pointer" : "pointer-events-none";
  const displayText = getTypeDisplayText(type as unknown as string, isEmployee);
  return (
    <div className={classNames}>
      {<div className="-mt-1 text-sm font-bold">{displayText}</div>}
      <DynamicForm
        form={form}
        fields={fields}
        append={append}
        remove={remove}
        name="uniqueNumber"
        label={displayText}
        classNameButton="mt-"
      >
        <ArrayField
          {...form}
          name="uniqueNumber"
          className="flex"
        >
          <Input placeholder={"1234567890"} className="block w-52" />
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
