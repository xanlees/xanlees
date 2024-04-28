"use client";
import { useUserFriendlyName } from "@refinedev/core";
import { type IBranch, type ISector } from "../sector/interface";
import { type IPosition } from "../position/interface";
import { useBranch, useBranchID, usePosition, useProvinceIds, useSector, useSectorID, useTableBranch } from "../branch/hook/useTableBranch";
import { List } from "@src/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { getSelectColumn } from "@src/common/containers/column";
import { branchColumn, getBrachActionsColumn, ProvinceColumn } from "../branch/containers/column/branch";
import { sectorColumn } from "../branch/containers/column/sector";
import { positionsColumn } from "../branch/containers/column/positions";

const type = "LOTTERY";
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
          {sectorColumn(sectorData, branchData)}
          {positionsColumn(positionData, branchData)}
          {getBrachActionsColumn({ resource: "branch", branchData })}
        </Table>
      </List>
    </div>
  );
}
