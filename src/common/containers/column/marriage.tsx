"use client";
import { Table } from "@/shadcn/components/table";
import { MaritalStatusType } from "@src/common/interface";
import { Badge } from "@src/shadcn/elements";

export function MarriageColumn(accessorKey: string) {
  return (
    <Table.Column
      accessorKey={accessorKey}
      header={"ສະຖານະ"}
      id="maritalStatus"
      enableSorting
      enableHiding
      cell={(props) => {
        const maritalStatus = props.getValue() as unknown as MaritalStatusType;
        const displayText = getMaritalStatusDisplayText(maritalStatus);
        return <Badge className="bg-green-500">{displayText}</Badge>;
      }}
    />
  );
}

const getMaritalStatusDisplayText = (
  maritalStatus: MaritalStatusType
): string => {
  switch (maritalStatus) {
    case "SINGLE":
      return "ໂສດ";
    case "MARRIED":
      return "ແຕ່ງງານແລ້ວ";
    default:
      return "ບໍ່ຮູ້ເພດ";
  }
};
