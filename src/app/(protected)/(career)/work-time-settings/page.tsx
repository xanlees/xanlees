"use client";

import { List } from "@/shadcn/components/crud";
import { useBranchWorkTimeSettingsTable } from "./hook/table";
import { DayOfWeekRow, getActionsButton } from "./containers/row";
import { Table } from "@src/shadcn/components/table";

const type = "HEADQUARTERS,BRANCH,OFFICE";

export default function WorkTimeSettingsList(): JSX.Element {
  const { table } = useBranchWorkTimeSettingsTable({ type });
  return (
    <List>
      <Table table={table} >
        <Table.Column
          header="ຫ້ອງການ"
          id="name"
          accessorKey="name"
        />
        {DayOfWeekRow()}
        {getActionsButton({ resource: "branch/work-time-settings" })}
      </Table>
    </List>
  );
}

