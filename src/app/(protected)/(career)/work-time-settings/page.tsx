"use client";

import { List } from "@/shadcn/components/crud";
import { CardView } from "@/shadcn/components/table/card-view";
import { getActionsButton } from "@src/common/containers/column/actionCard";
import { useBranchWorkTimeSettingsTable, useWorkTimeSettings } from "./hook/table";
import { type IWorkTimeSettings } from "./interface";
import { DayOfWeekRow } from "./containers/cardRow";

export default function WorkTimeSettingsList(): JSX.Element {
  const { table } = useBranchWorkTimeSettingsTable();
  const branchId = [1, 2];
  const workTimeSettingsData = useWorkTimeSettings<IWorkTimeSettings>({ branchId }).data;
  return (
    <List>
      <CardView table={table} className=" w-80 ">
        <CardView.Row
          header="ທີຕັ້ງຫ້ອງການ"
          id="name"
          accessorKey="name"
          isHeader={true}
        />
        {DayOfWeekRow({ workTimeSettingsData })}
        {getActionsButton("branch/work-time-settings")}
      </CardView>
    </List>
  );
}
