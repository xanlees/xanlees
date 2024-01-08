import { Table, type TableFilterProps } from "@/shadcn/components/table";
export function usernameColumn() {
  return (
    <Table.Column
      header="Username"
      id="username"
      accessorKey="username"
      enableSorting
      enableHiding
      filter={(props: TableFilterProps) => (
        <Table.Filter.Search {...props} title="Search Username" />
      )}
    />
  );
}
