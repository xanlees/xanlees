"use client";
import { Table } from "@/shadcn/components/table";

export function PhoneNumberColumn(accessorKey: string) {
  return (
    <Table.Column
      accessorKey={accessorKey}
      header={"ເບີໂທ"}
      id="phoneNumber"
      cell={(props) => {
        return (
          <p className=" italic text-blue-500 underline ">{props.getValue() as unknown as string}</p>
        );
      }}
    />
  );
}
