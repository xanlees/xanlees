/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */
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

export function SelectScrollable() {
  const positions = [
    { value: "ux-ui", label: "UX/UI Designer" },
    { value: "programmer", label: "Programmer" },
    { value: "marketing", label: "Marketing Specialist" },
    { value: "customer-support", label: "Customer Support Representative" },
    { value: "data-analyst", label: "Data Analyst" },
  ];
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a positions" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Open Positions</SelectLabel>
          {positions.map((position) => (
            <SelectItem key={position.value} value={position.value}>
              {position.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
