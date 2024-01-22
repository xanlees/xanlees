"use client";
import { Table } from "@/shadcn/components/table";
import type { GenderType } from "@src/app/(protected)/(career)/employee/interface";
import { getGenderDisplayText } from "@src/app/(protected)/(career)/employee/lib/genderUtils";
import { Badge } from "@src/shadcn/elements";

export const GenderColumn = <Table.Column
  header="ເພດ"
  id="gender"
  accessorKey="profileDetail.gender"
  enableSorting
  enableHiding
  cell={(props) => {
    const gender = props.getValue() as unknown as GenderType;
    const displayText = getGenderDisplayText(gender);
    return <Badge>{displayText}</Badge>;
  }} />;
