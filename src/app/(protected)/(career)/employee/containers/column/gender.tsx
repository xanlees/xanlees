/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Table } from "@/shadcn/components/table";
import { Badge } from "@src/shadcn/elements";
import type { GenderType } from "../../interface";
import { getGenderDisplayText } from "../../lib/genderUtils";

export const GenderColumn = <Table.Column
  header="ເພດ"
  id="gender"
  accessorKey="gender"
  enableSorting
  enableHiding
  cell={(props) => {
    const gender = props.getValue() as unknown as GenderType;
    const displayText = getGenderDisplayText(gender);
    return <Badge>{displayText}</Badge>;
  }} />;
