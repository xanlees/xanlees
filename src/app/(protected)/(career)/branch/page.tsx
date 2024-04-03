"use client";
import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { useBranchID, useSector } from "./hook/useSector";
import { getActionsColumn } from "@src/common/containers/column/action";
import { getSelectColumn } from "@src/common/containers/column/select";
import { usePosition, useSectorID } from "./hook/usePosition";
import { positionsColumn } from "./containers/column/positions";
import { branchColumn } from "./containers/column/branch";
import { sectorColumn } from "./containers/column/sector";
import { useTableBranch } from "./hook/useTableBranch";
import { type ISector } from "../sector/interface";
import { type IPosition } from "../position/interface";

const resource = "branch";
export default function BranchList(): JSX.Element {
  const { table } = useTableBranch("OFFICE");
  const branch = table.options.data ?? [];
  const branchId = useBranchID(branch);
  const { data: sectorData } = useSector({ branchId, branch }) as {
    data: ISector[]
  };
  const sectorId = useSectorID(sectorData);
  const { data: positionData } = usePosition({ sectorId, branch }) as {
    data: IPosition[]
  };

  const friendly = useUserFriendlyName();
  return (
    <div className="mx-auto">
      <List>
        <Table table={table}>
          {getSelectColumn(friendly)}
          {branchColumn()}
          {sectorColumn(sectorData)}
          {positionsColumn(sectorData, positionData)}
          {getActionsColumn(resource)}
        </Table>
      </List>
    </div>
  );
}
