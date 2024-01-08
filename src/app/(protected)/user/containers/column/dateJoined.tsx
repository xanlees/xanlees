import { Table } from "@/shadcn/components/table";
import moment from "moment";
export function dateJoinedColumn() {
  return (
    <Table.Column
      header="Created At"
      id="dateJoined"
      accessorKey="dateJoined"
      enableSorting
      enableHiding
      cell={(props) => {
        const dateValue = props.getValue();
        if (typeof dateValue === "string") {
          return moment(dateValue).format("DD MMM YYYY");
        }
        return "";
      }}
    />
  );
}
