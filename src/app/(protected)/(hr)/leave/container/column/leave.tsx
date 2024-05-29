import { Table } from "@/shadcn/components/table";
import { type ILeaveExpand } from "../../lib";
import UpdateOnSelect from "@src/shadcn/components/updateOnSelect";

export function TitleColumn() {
  return (
    <Table.Column<ILeaveExpand>
      header={"ຫົວຂໍ້"}
      accessorKey="title"
      id="title"
      enableSorting
      enableHiding
      cell={(props) => {
        const title = props?.row?.original?.title as unknown as string;
        return <p>{title ?? ""}</p>;
      }}
    />
  );
}

export function LeaveStatus() {
  return (
    <Table.Column<ILeaveExpand>
      header="ສະຖານະ"
      id="status"
      accessorKey="status"
      cell={({ row: { original } }) => {
        const { status, id } = original;
        const leaveID = id ?? 0;
        return (
          <UpdateOnSelect
            defaultValue={status}
            id={leaveID}
            optionsConfig={options}
            field="status"
            resource="leave"
            className="w-[120px]"
          />
        );
      }}
    />
  );
}

export const options = [
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];
