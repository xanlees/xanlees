import { Button, FormLabel, Input } from "@src/shadcn/elements";
import { Asterisk } from "lucide-react";
import React from "react";
import { type FieldArrayWithId } from "react-hook-form";
import { useFieldAppend } from "./hooks/useFieldAppend";

interface Field {
  id: string
  [key: string]: any
}

interface InputFieldProps {
  fields: Array<FieldArrayWithId<Field>>
  append: (obj: Record<string, any>) => void
  name: string
  errorMessage?: string
  maxLength?: number
  numericOnly?: boolean
  type?: "currency" | "number" | "text"
  className?: string
  placeholder?: string
  label?: string
  require?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({ fields, append, name, errorMessage, type, maxLength, numericOnly, className, label, placeholder, require = true }) => {
  const { initialValue, showTooltip, handleValueChange, handleAppend } = useFieldAppend({ fields, append, name });
  return (
    <div className="flex flex-col">
      <FormLabel className="flex">
        {require && <Asterisk size={15} color="#ff0000" />}
        {label}
      </FormLabel>
      <div className="w-full">
        <div className="flex gap-2 w-full">
          <Input
            value={initialValue}
            onChange={handleValueChange}
            placeholder={placeholder}
            className={className}
            numericOnly={numericOnly}
            type={type}
            maxLength={maxLength}
          />
          <Button type="button" onClick={handleAppend} className="mt-2">
            ເພີ່ມ{label}
          </Button>
        </div>
      </div>
      {showTooltip && <p className="text-red-500">{errorMessage ?? "Duplicate value"}</p>}
    </div>
  );
};
