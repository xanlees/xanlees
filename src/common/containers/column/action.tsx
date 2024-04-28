import { Table } from "@/shadcn/components/table";
import { Edit, Eye, Trash2 } from "lucide-react";

export function getActionsColumn({
  resource,
  hideShow = false,
  hideEdit = false,
  hideDelete = false,
}: {
  resource: string
  hideShow?: boolean
  hideEdit?: boolean
  hideDelete?: boolean
}) {
  return (
    <Table.Column
      accessorKey={"id"}
      id={"actions"}
      cell={({ row: { original } }) => (
        <Table.Actions>
          {!hideShow && (
            <Table.ShowAction
              title="Detail"
              row={original}
              resource={resource}
              icon={<Eye size={16} />}
            />
          )}
          {!hideEdit && (
            <Table.EditAction
              title="Edit"
              row={original}
              resource={resource}
              icon={<Edit size={16} />}
            />
          )}
          {!hideDelete && (
            <Table.DeleteAction
              title="Delete"
              row={original}
              withForceDelete={true}
              resource={resource}
              icon={<Trash2 size={16} />}
            />
          )}
        </Table.Actions>
      )}
    />
  );
}
