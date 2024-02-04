"use client";
import { Table } from "@/shadcn/components/table";

export function PhoneNumberColumn(accessorKey: string) {
  return (
    <Table.Column
      accessorKey={accessorKey}
      header={"ເບີໂທລະສັບ"}
      id="phoneNumber"
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
