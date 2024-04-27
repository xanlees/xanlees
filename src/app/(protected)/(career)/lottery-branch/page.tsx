"use client";

import { getActionsColumn, getSelectColumn } from "@src/common/containers/column";
import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { branchColumn, positionsColumn, sectorColumn, useBranchID, usePosition, useSector, useTableBranch, type IPosition, type ISector } from "..";
import { useSectorID } from "../branch/hook/usePosition";

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
          <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ ສາຂາ">
            {getSelectColumn(friendly)}
            {branchColumn()}
            {sectorColumn(sectorData)}
            {positionsColumn(sectorData, positionData)}
            {getActionsColumn({ resource: "office-branch" })}
          </Table>
        </div>
      </List>
    </div>
  );
}

