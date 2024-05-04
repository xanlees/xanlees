"use client";

import { List } from "@/shadcn/components/crud";
import { CardView } from "@/shadcn/components/table/card-view";
import { useBranchWorkTimeSettingsTable } from "./hook/table";
import { DayOfWeekRow, getActionsButton } from "./containers/row";

const type = "HEADQUARTERS,BRANCH,OFFICE";
export default function WorkTimeSettingsList(): JSX.Element {
  const { table } = useBranchWorkTimeSettingsTable({ type });
  return (
    <List>
      <CardView table={table} className="w-[340px] h-[500px]">
        <CardView.Row
          header="ຫ້ອງການ"
          id="name"
          accessorKey="name"
          isHeader={true}
        />
        {DayOfWeekRow()}
        {getActionsButton({ resource: "branch/work-time-settings" })}
      </CardView>
    </List>
  );
}

