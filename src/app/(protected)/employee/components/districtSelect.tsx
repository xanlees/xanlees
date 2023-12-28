/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// SelectScrollable.tsx
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@src/shadcn/ui";
import { useSelect } from "@refinedev/core";
import { type IDistrict } from "../interface";

interface SelectScrollableProps {
  onSelect: (selectedValue: any) => void
}

function SelectScrollable({ onSelect }: SelectScrollableProps) {
  const { options } = useSelect<IDistrict>({
    resource: "district",
    optionLabel: "districtName",
    optionValue: "id",
  });
  return (
    <Select onSelect={onSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a district" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>district</SelectLabel>
          {options && (
            <SelectGroup>
              {options.map((option) => (
                <SelectItem
                  key={option.value as string}
                  value={option.value as string}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectScrollable;
