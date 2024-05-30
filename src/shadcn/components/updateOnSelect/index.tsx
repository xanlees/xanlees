import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../elements";
import { IUpdateDropdownSelectProps } from "./interface";
import { useUpdateOnSelect } from "./hooks/useUpdate";
import { cn } from "@src/shadcn/lib/utils";

const UpdateOnSelect: React.FC<IUpdateDropdownSelectProps> = ({ 
  defaultValue = "",
  label = "Select", 
  placeholder="Select a status",
  optionsItem = [],
  className,
  isMultipart,
  onChange,
  redirect,
  resource, id,  field, }) => {
  const { onUpdateHandler, } = useUpdateOnSelect({resource, id, field, isMultipart, redirect });
  const handleChange = (val: number | string) => {
    onUpdateHandler(val);
    onChange?.(val);
  };
  const selectedOption = optionsItem.find(option => option.value === defaultValue);
  return (
    <Select onValueChange={handleChange} defaultValue={defaultValue}>
      <SelectTrigger className={cn("w-[180px]", selectedOption?.className, className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {optionsItem.map(option => (
            <SelectItem className={cn("w-[180px]", option?.className )} key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default UpdateOnSelect;

