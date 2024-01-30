import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@src/shadcn/elements";
import { IUpdateDropdownSelectProps } from "./interface";
import { useUpdateDropdownSelect } from "./hooks/useUpdate";

const UpdateDropdownSelect: React.FC<IUpdateDropdownSelectProps> = ({ defaultValue = "", id, optionsConfig = [], field, resource, label = "ເລືອກ" }) => {
  const { onUpdate } = useUpdateDropdownSelect(resource);
  const handleValueChange = (value: string) => {
    onUpdate({ id, value, field });
  };
  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {optionsConfig.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default UpdateDropdownSelect;

