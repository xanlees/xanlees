import { Table } from "@/shadcn/components/table";
import { Edit, Eye, Trash2 } from "lucide-react";

interface IActionsProps {
  original?: unknown
  resource: string
  hide?: boolean
}
function renderShowAction({ original, resource, hide }: IActionsProps) {
  if (!hide) {
    return (
      <Table.ShowAction
        title="Detail"
        row={original}
        resource={resource}
        icon={<Eye size={16} />}
      />
    );
  }
  return null;
}

function renderEditAction({ original, resource, hide }: IActionsProps) {
  if (!hide) {
    return (
      <Table.EditAction
        title="Edit"
        row={original}
        resource={resource}
        icon={<Edit size={16} />}
      />
    );
  }
  return null;
}

function renderDeleteAction({ original, resource, hide }: IActionsProps) {
  if (!hide) {
    return (
      <Table.DeleteAction
        title="Delete"
        row={original}
        withForceDelete={true}
        resource={resource}
        icon={<Trash2 size={16} />}
      />
    );
  }
  return null;
}

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
}): JSX.Element {
  return (
    <Table.Column
      accessorKey={"id"}
      id={"actions"}
      cell={({ row: { original } }) => (
        <Table.Actions>
          {renderShowAction({ original, resource, hide: hideShow })}
          {renderEditAction({ original, resource, hide: hideEdit })}
          {renderDeleteAction({ original, resource, hide: hideDelete })}
        </Table.Actions>
      )}
    />
  );
}

