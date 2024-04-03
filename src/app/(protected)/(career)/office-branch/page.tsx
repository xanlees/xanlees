"use client";

import { getActionsColumn, getSelectColumn } from "@src/common/containers/column";
import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { usePosition, useSector, useSectorID } from "../branch/hook";
import { useUserFriendlyName } from "@refinedev/core";

import { branchColumn, type IPosition, type ISector, positionsColumn, sectorColumn, useBranchID, useTableBranch } from "..";

export default function BranchList(): JSX.Element {
  const { table } = useTableBranch("ແມ່ຫວຍ");
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

