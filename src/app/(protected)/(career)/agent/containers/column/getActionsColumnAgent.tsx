import { Table } from "@/shadcn/components/table";
import { Edit, Eye, Trash2 } from "lucide-react";

export function getActionsColumnAgent() {
  return (
    <Table.Column
      accessorKey={"id"}
      id={"actions"}
      cell={({ row: { original } }) => (
        <Table.Actions>
          <Table.ShowAction
            title="Detail"
            row={original}
            resource={"agent"}
            icon={<Eye size={16} />}
          />
          <Table.EditAction
            title="Edit"
            row={original}
            resource={"agent"}
            icon={<Edit size={16} />}
          />
          <Table.DeleteAction
            title="Delete"
            row={original}
            withForceDelete={true}
            resource={"profile"}
            icon={<Trash2 size={16} />}
          />
        </Table.Actions>
      )}
    />
  );
}
