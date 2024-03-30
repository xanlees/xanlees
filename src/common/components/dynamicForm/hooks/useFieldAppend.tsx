/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from "react";
import { type FieldArrayWithId, type FieldValues } from "react-hook-form";

interface UseFieldAppendProps<Field extends FieldValues> {
  fields: Array<FieldArrayWithId<Field>>
  append: (obj: Record<string, any>) => void
  name: string
}

export const useFieldAppend = <Field extends Record<string, any>>({
  fields,
  append,
  name,
}: UseFieldAppendProps<Field>) => {
  const [initialValue, setInitialValue] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialValue(event.target.value);
    setShowTooltip(false);
  };

  const handleAppend = () => {
    if (initialValue.trim() !== "") {
      const valueExists = fields.some((field) => {
        return field[name as keyof typeof field] === initialValue.trim();
      });
      if (!valueExists) {
        append({ [name]: initialValue.trim() });
        setInitialValue("");
        setShowTooltip(false);
      } else {
        setShowTooltip(true);
      }
    }
  };
  return { initialValue, showTooltip, handleValueChange, handleAppend };
};

