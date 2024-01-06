/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Table } from "@/shadcn/components/table";
import { Badge } from "@src/shadcn/elements";
import type { MaritalStatusType } from "../../interface";
import { getMaritalStatusDisplayText } from "../../lib/genderUtils";

export const MarriageStatus = <Table.Column
  header="ສະຖານະ"
  id="maritalStatus"
  accessorKey="profileDetail.maritalStatus"
  enableSorting
  enableHiding
  cell={(props) => {
    const maritalStatus = props.getValue() as unknown as MaritalStatusType;
    const displayText = getMaritalStatusDisplayText(maritalStatus);
    return <Badge className="bg-green-500">{displayText}</Badge>;
  }} />;
