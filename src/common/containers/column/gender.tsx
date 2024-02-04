"use client";
import { Table } from "@/shadcn/components/table";
import { GenderType } from "@src/common/interface";
import { Badge } from "@src/shadcn/elements";

export function GenderColumn(accessorKey: string) {
  return (
    <Table.Column
      accessorKey={accessorKey}
      header={"ເພດ"}
      id="gender"
      enableSorting
      enableHiding
      cell={(props) => {
        const gender = props.getValue() as unknown as GenderType;
        const displayText = getGenderDisplayText(gender);
        return <Badge>{displayText}</Badge>;
      }}
    />
  );
}

export const getGenderDisplayText = (gender: GenderType): string => {
  switch (gender) {
    case "MALE":
      return "ຊາຍ";
    case "FEMALE":
      return "ຍິງ";
    case "OTHER":
      return "ອື່ນໆ";
    default:
      return "ບໍ່ຮູ້ເພດ";
  }
};
