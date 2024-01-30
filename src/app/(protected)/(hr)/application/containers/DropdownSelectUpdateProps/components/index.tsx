import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@src/shadcn/elements";
import { useUpdateDropdownSelect } from "../hooks/useUpdate";

interface UpdateDropdownSelectProps {
  readonly defaultValue?: string;
  readonly id: number;
  readonly options?: { value: string; label: string }[];
  readonly field: string;
  readonly resource: string;
  readonly label?: string;
}

export const UpdateDropdownSelect: React.FC<UpdateDropdownSelectProps> = ({ defaultValue, id, options, field, resource, label}) => {
  const { onUpdate } = useUpdateDropdownSelect(resource);
  const handleValueChange = (value: string) => {
    onUpdate({ id, value, field});
  };
  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label !== undefined ? label : "ເລືອກ"}</SelectLabel>
          {options?.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

