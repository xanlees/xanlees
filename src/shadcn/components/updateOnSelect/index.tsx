import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../elements";
import { IUpdateDropdownSelectProps } from "./interface";
import { useUpdateOnSelect } from "./hooks/useUpdate";
import { cn } from "@src/shadcn/lib/utils";

const UpdateOnSelect: React.FC<IUpdateDropdownSelectProps> = ({ 
  defaultValue = "",
  label = "Select", 
  placeholder="Select a status",
  optionsConfig = [],
  className,
  isMultipartFormData,
  resource, id,  field, }) => {
  const { onUpdateHandler } = useUpdateOnSelect({resource, id, field, isMultipartFormData });
  return (
    <Select onValueChange={onUpdateHandler} defaultValue={defaultValue}>
      <SelectTrigger className={cn("w-[180px]", className )}>
        <SelectValue placeholder={placeholder} />
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

export default UpdateOnSelect;

