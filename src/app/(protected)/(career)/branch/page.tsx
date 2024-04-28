"use client";

import { branchColumn, getBrachActionsColumn, ProvinceColumn } from "./containers/column/branch";
import { getSelectColumn } from "@src/common/containers/column/select";
import { List } from "@/shadcn/components/crud";
import { positionsColumn } from "./containers/column/positions";
import { sectorColumn } from "./containers/column/sector";
import { Table } from "@/shadcn/components/table";
import {
  useBranch,
  usePosition,
  useProvinceIds,
  useSector,
  useSectorID,
  useTableBranch,
} from "./hook/useTableBranch";
import { useBranchID } from "./hook/useSector";
import { useUserFriendlyName } from "@refinedev/core";
import { type IBranch, type ISector } from "../sector/interface";
import { type IPosition } from "../position/interface";

const title = "ພະແນກ";
const type = "HEADQUARTERS,BRANCH,OFFICE";
export default function BranchList(): JSX.Element {
  const { table } = useTableBranch(type);
  const province = table.options.data ?? [];
  const provinceIDs = useProvinceIds(province);
  const branchData = useBranch<IBranch>({ province: provinceIDs, branch: province, type })?.data;
  const branchId = useBranchID(branchData);
  const sectorData = useSector<ISector>({ branchId })?.data;
  const sectorId = useSectorID(sectorData);
  const positionData = usePosition<IPosition>({ sectorId })?.data;
  const friendly = useUserFriendlyName();
  return (
    <div className="mx-auto">
      <List>
        <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ ສາຂາ">
          {getSelectColumn(friendly)}
          {ProvinceColumn()}
          {branchColumn(branchData)}
          {sectorColumn(sectorData, branchData, title)}
          {positionsColumn(positionData, branchData)}
          {getBrachActionsColumn({ resource: "branch", branchData })}
        </Table>
      </List>
    </div>
  );
}
