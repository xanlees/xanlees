import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@src/shadcn/elements";
import { useUpdateApplication } from "../../hooks/useUpdateApplication";

interface SelectColumnProps {
  readonly applicationStatus: string
  readonly id: number
}

export function SelectColumn({ applicationStatus, id }: SelectColumnProps) {
  const { updateApplication } = useUpdateApplication();
  const handleValueChange = (value: string) => {
    updateApplication({ id, value });
  };
  return (
    <Select onValueChange={handleValueChange} defaultValue={applicationStatus}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>ເລືອກສະຖານະ</SelectLabel>
          <SelectItem value="New">ໃຫມ່</SelectItem>
          <SelectItem value="Contacted">ຕິດຕໍ່</SelectItem>
          <SelectItem value="Interviewed">ສຳພາດແລ້ວ</SelectItem>
          <SelectItem value="Hired">ຈ້າງເປັນພະນັກງານແລ້ວ</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

