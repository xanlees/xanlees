"use client";

import { List } from "@/shadcn/components/crud";
import { CardView } from "@/shadcn/components/table/card-view";

import {
  useBranchWorkTimeSettingsTable,
  useWorkTimeSettings,
} from "./hook/table";
import { type IWorkTimeSettings } from "./interface";
import { DayOfWeekRow } from "./containers/cardRow";
import { type IBranch } from "../branch/interface";
import { Table } from "@src/shadcn/components/table";
import { Edit, Trash2 } from "lucide-react";

const type = "HEADQUARTERS,BRANCH,OFFICE";
export default function WorkTimeSettingsList(): JSX.Element {
  const { table } = useBranchWorkTimeSettingsTable(type);
  const branchData = table.options.data ?? [];
  const branchId = useBranchId(branchData);
  const workTimeSettingsData = useWorkTimeSettings<IWorkTimeSettings>({
    branchId,
  }).data;
  return (
    <List>
      <CardView table={table} className=" w-80 ">
        <CardView.Row
          header="ຊື້ຫ້ອງຫານ"
          id="name"
          accessorKey="name"
          isHeader={true}
        />
        {DayOfWeekRow({ workTimeSettingsData })}
        {getActionsButton({ resource: "branch/work-time-settings", workTimeSettingsData })}
      </CardView>
    </List>
  );
}

function useBranchId(branch: IBranch[]) {
  const branchId = branch.map((item) => item.id);
  if (branchId) {
    return branchId;
  }
  return [];
}

export function getActionsButton({ resource, workTimeSettingsData }: { resource: string, workTimeSettingsData: IWorkTimeSettings[] }) {
  return (
    <CardView.Row
      accessorKey={"id"}
      id={"actions"}
      isAction={true}
      cell={({ row }) => {
        const id = row?.original?.id as number;
        const matchingBranches = workTimeSettingsData?.filter((branch) => branch.branch === id);
        return (
          <div className="top-0 right-0 absolute">
            <Table.Actions>
              <Table.EditAction
                title="ແກ້ໄຂ"
                row={matchingBranches?.[0]}
                resource={resource}
                icon={<Edit size={16} />}
              />
              <Table.DeleteAction
                title="ລົບ"
                row={matchingBranches?.[0]}
                withForceDelete={true}
                resource={resource}
                icon={<Trash2 size={16} />}
              />
            </Table.Actions>
          </div>

        );
      }}
    />
  );
}
