/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { cn } from "@src/lib/utils";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
interface DynamicFormProps {
  form?: any
  fields?: Array<{
    id?: string
    value?: string
  }>
  append?: any
  remove?: (index: number) => void
  name?: string
  className?: string
  label?: string
  setValue?: any
  watch?: any
  control?: any
}

export const DynamicForms: React.FC<DynamicFormProps> = ({
  form,
  fields,
  append,
  remove,
  className,
  name,
  label,
}) => {
  return (
    <DynamicForm
      form={form}
      fields={fields}
      append={append}
      remove={remove}
      name={name}
      className={cn("rounded-full w-96 sm:w-[560px]", className)}
      label={label}
    />
  );
};
