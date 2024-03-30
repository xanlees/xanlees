/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from "react";

export const useFormEdit = (form: any, name: string) => {
  const formArray = form.watch(name)?.map((value: any) => ({ [name]: value }));
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
    setShowTooltip(false);
  };

  const handleSave = (index: number) => {
    const valueExists = formArray.some(
      (field: Record<string, string>, idx: number) => idx !== index && field[name] === editValue.trim(),
    );

    if (!valueExists) {
      form.setValue(`${name}[${index}]`, { [name]: editValue.trim() });
      setEditIndex(null);
      setEditValue("");
      setShowTooltip(false);
    } else {
      setShowTooltip(true);
    }
  };

  return {
    formArray,
    editIndex,
    editValue,
    showTooltip,
    handleEditChange,
    handleSave,
    setEditIndex,
    setEditValue,
  };
};
