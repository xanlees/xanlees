"use client";
import { Table } from "@/shadcn/components/table";
import { Checkbox, CommandItem } from "@src/shadcn/elements";

export function getSelectColumn(friendly: (name: string | undefined, type: "singular" | "plural") => string) {
  return <Table.Column
    id={"select"}
    accessorKey="id"
    header={({ table }) => (
      <Table.CheckAll table={table}>
        <CommandItem
          onSelect={() => {
            alert("Delete Selected");
          }}
        >
          Delete Selected ({table.getSelectedRowModel().rows.length}){" "}
          {friendly(
            "Row",
            table.getSelectedRowModel().rows.length > 1 ? "plural" : "singular",
          )}
        </CommandItem>
      </Table.CheckAll>
    )}
    cell={({ row }) => (
      <Checkbox
        className="translate-y-[2px]"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(Boolean(value));
        }}
        aria-label="Select row"
        key={`checkbox-${row.original.id}`} />
    )} />;
}

export function SequenceColumn() {
  return (
    <Table.Column
      header="ລໍາດັບ"
      id="sequence"
      accessorKey="sequence"
      cell={(props) => {
        const { row } = props;
        const pageIndex = props?.table?.options?.state?.pagination?.pageIndex ?? 0;
        const pageSize = props?.table?.options?.state?.pagination?.pageSize ?? 0;
        const sequenceNumber = pageIndex * pageSize + row.index + 1;
        return <div className="ml-3">{sequenceNumber}</div>;
      }}
    />
  );
}
