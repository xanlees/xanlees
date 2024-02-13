"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";

export function PhoneNumberColumn(accessorKey: string) {
  return (
    <Table.Column
      accessorKey={accessorKey}
      header={"ເບີໂທລະສັບ"}
      id="phoneNumber"
      enableSorting
      enableHiding
      filter={(props: TableFilterProps) => (
        <Table.Filter.Search {...props} title="Search Phone number" />
      )}
      cell={(props) => {
        return (
          <p className="-mx-5 italic text-blue-500 underline ">{`+856 ${
            props.getValue() as unknown as string
          }`}</p>
        );
      }}
    />
  );
}
