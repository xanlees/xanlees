import { Table } from "@/shadcn/components/table";
import { Badge } from "@src/shadcn/elements";

export function groupColumn() {
  return (
    <Table.Column
      header="Permission"
      id="groups"
      accessorKey="groups"
      enableSorting
      enableHiding
      cell={(props) => {
        const groups = props.getValue() as unknown as string[];
        return groups.map((value: string, index) => {
          return <Badge key={`badge-${index}`}>{value}</Badge>;
        });
      }}
    />
  );
}
