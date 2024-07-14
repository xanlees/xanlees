import moment from "moment";

import { Table } from "@/shadcn/components/table";
import UpdateOnSelect from "@src/shadcn/components/updateOnSelect";
import { type ILeaveExpand } from "../../lib";

export function ReasonColumn() {
  return (
    <Table.Column<ILeaveExpand>
      header={"ເຫດ​ຜົນ"}
      accessorKey="reason"
      id="reason"
      enableSorting
      enableHiding
      cell={(props) => {
        const reason = props?.row?.original?.reason as unknown as string;
        return <div className="w-64">{reason ?? ""}</div>;
      }}
    />
  );
}

export function LeaveStatus() {
  const options = [
    { value: "Pending", label: "ລໍຖ້າອະນຸມັດ", className: "text-blue-500 border-blue-500" },
    { value: "Approved", label: "ອະນຸມັດແລ້ວ", className: "text-green-500 border-green-500" },
    { value: "Rejected", label: "ປະຕິເສດຄໍາຂໍ", className: "text-red-500 border-red-500" },
  ];
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
            optionsItem={options}
            field="status"
            resource="leave"
            className="w-[120px]"
          />
        );
      }}
    />
  );
}

export function LeaveColumn({ date, header }: { date: string, header: string }) {
  return (
    <Table.Column<ILeaveExpand>
      header={header}
      id={date}
      accessorKey={date}
      cell={(props) => {
        const date = props.getValue() as unknown as number;
        if (date) {
          return moment(date).format("DD MMM YYYY");
        }
        return "";
      }}
    />
  );
}

