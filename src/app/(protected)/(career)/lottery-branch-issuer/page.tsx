"use client";
import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { getActionsColumn } from "@src/common/containers/column";

import {
  branchColumn, employeeColumn, ProvinceColumn, sectorColumn,
} from "../branch/containers/column";
import { useBranchTable, useEmployee, usePosition, useSector } from "../branch/hook/table";
import { getBranchIds, getPositionIds } from "../branch/lib";
import { type IEmployeeExpand, type IEmployeeExpandProfile } from "../employee/interface";
import { type IPosition } from "../position/interface";
import { type ISector } from "../sector/interface";
import { useSession } from "next-auth/react";
import { type CustomSession } from "@src/common/interface";
import { useList } from "@refinedev/core";

const type = "LOTTERY";
const title = "ໜ່ວຍ";

export default function BranchList(): JSX.Element {
  const data = useEmployeeProvince();
  const provinceID = data.data?.data?.[0]?.branchId.province;
  const { table } = useBranchTable({ type, province: provinceID });
  const branch = table.options.data ?? [];
  const branchIds = getBranchIds(branch);
  const positionData = usePosition<IPosition>({ branchIds })?.data;
  const positionIds = getPositionIds(positionData);
  const employeeData = useEmployee<IEmployeeExpandProfile>({ positionId: positionIds })?.data;
  const sectorData = useSector<ISector>({ branchId: branchIds })?.data;
  return (
    <div className="mx-auto">
      <List>
        <Table table={table} SearchBarTitle="ຄົ້ນຫາ">
          {ProvinceColumn()}
          {branchColumn({ title: "ເມືອງ" })}
          {sectorColumn({ title, sectorData })}
          {employeeColumn({ employeeData, title: "ສະມາຊິກ (ສັງກັດຈາມສີ)" })}
          {getActionsColumn({ resource: "branch", hideShow: true })}
        </Table>
      </List>
    </div>
  );
}

export function useEmployeeProvince() {
  const { data } = useSession() as { data: CustomSession | null };
  const useId = data?.user?.id ?? 0;
  console.log("useId", useId);
  return useList<IEmployeeExpand>({
    resource: "employee",
    filters: [
      { field: "user", operator: "eq", value: 109 },
      { field: "fields", operator: "eq", value: "branch_id,id" },
      { field: "expand", operator: "eq", value: "branch_id" },
    ],
    errorNotification: false,
  });
}
