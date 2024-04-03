"use client";

import { getActionsColumn, getSelectColumn } from "@src/common/containers/column";
import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";

import { usePosition, useSectorID } from "../branch/hook/usePosition";
import { useTableBranch } from "../branch/hook/useTableBranch";
import { useBranchID, useSector } from "../branch/hook/useSector";
import { branchColumn } from "../branch/containers/column/branch";
import { sectorColumn } from "../branch/containers/column/sector";
import { positionsColumn } from "./containers/column/positions";
import { type IPosition, type ISector } from "../branch/interface";

export default function BranchList(): JSX.Element {
  const branchType = "LOTTERY";
  const { table } = useTableBranch(branchType);
  const branch = table.options.data ?? [];
  const branchId = useBranchID(branch);
  const { data: sectorData } = useSector({ branchId, branch }) as { data: ISector[] };
  const sectorId = useSectorID(sectorData);
  const { data: positionData } = usePosition({ sectorId, branch }) as { data: IPosition[] };
  const friendly = useUserFriendlyName();

  return (
    <div className="mx-auto">
      <List>
        <div className="w-2/3 mx-auto">
          <Table table={table}>
            {getSelectColumn(friendly)}
            {branchColumn()}
            {sectorColumn(sectorData)}
            {positionsColumn(sectorData, positionData)}
            {getActionsColumn("office-branch")}
          </Table>
        </div>
      </List>
    </div>
  );
}

