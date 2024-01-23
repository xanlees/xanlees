"use client";
import { Table } from "@/shadcn/components/table";
import { Badge } from "@src/shadcn/elements";
import { getMaritalStatusDisplayText } from "@src/app/(protected)/(career)/employee/lib/genderUtils";
import type { MaritalStatusType } from "@src/app/(protected)/(career)/employee/interface";

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
