"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { type GenderType } from "@src/common/interface";
import { Badge } from "@src/shadcn/elements";

export function GenderColumn(accessorKey: string) {
  return (
    <Table.Column
      accessorKey={accessorKey}
      header={"ເພດ"}
      id="gender"
      enableSorting
      enableHiding
      filter={(props: TableFilterProps) => (
        <Table.Filter.Search {...props} title="Search Gender" />
      )}
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
