import { Table, type TableFilterProps } from "@/shadcn/components/table";
export function branchColumn() {
  return (
    <Table.Column
      header={"ສາຂາ"}
      accessorKey="name"
      id="name"
      enableSorting
      enableHiding
      filter={(props: TableFilterProps) => (
        <Table.Filter.Search {...props} title="Search Branch" />
      )}
    />
  );
}
