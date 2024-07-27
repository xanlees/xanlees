"use client";

import { useState } from "react";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { getActionsColumn, SequenceColumn } from "@src/common/containers/column";

import {
  branchColumn, ProvinceColumn,
} from "../branch/containers/column";
import { SelectProvince } from "../branch/containers/selectProvince";
import { useBranchTable, useEmployee, usePosition, useSector } from "../branch/hook/useTable";
import { getBranchIds, getPositionIds } from "../branch/lib";
import { type IEmployeeExpandProfile } from "../employee/interface";
import { type IPosition } from "../position/interface";
import { type ISector } from "../sector/interface";
import { Badge } from "@src/shadcn/elements";

const type = "LOTTERY";
const title = "ໜ່ວຍ";

export default function BranchList(): JSX.Element {
  const [selected, setSelected] = useState<number | undefined>();
  const { table } = useBranchTable({ type, province: selected });
  const branch = table.options.data ?? [];
  const branchIds = getBranchIds(branch);
  const positionData = usePosition<IPosition>({ branchIds })?.data;
  const positionIds = getPositionIds(positionData);
  const employeeData = useEmployee<IEmployeeExpandProfile>({ positionId: positionIds })?.data;
  const sectorData = useSector<ISector>({ branchId: branchIds })?.data;
  return (
    <div className="mx-auto">
      <List>
        <SelectProvince setSelected={setSelected} />
        <Table table={table} SearchBarTitle="ຄົ້ນຫາ">
          {SequenceColumn()}
          {branchColumn({ title: "ຫ້ອງການ" })}
          {totalUnitColumn({ title, sectorData })}
          {TotalAgentColumn({ employeeData, title: "ຈຳນວນຄົນຂາຍເລກ " })}
          {ProvinceColumn()}
          {getActionsColumn({ resource: "branch", hideShow: true })}
        </Table>
      </List>
    </div>
  );
}
export function totalUnitColumn({ sectorData, title }: { sectorData: ISector[], title: string }) {
  return (
    <Table.Column
      header={title}
      accessorKey="id"
      id="sector"
      cell={({ row: { original } }) => {
        const branchId = original?.id;
        const filteredSectors = sectorData?.filter((item) => item?.branchId === branchId && item?.type === "Unit");
        return (
          <div>
            <Badge color="success" className="text-xl font-bold">{filteredSectors?.length ?? 0}</Badge>
          </div>
        );
      }}
    />
  );
}

export function TotalAgentColumn({ employeeData, title }: { employeeData: IEmployeeExpandProfile[], title: string }) {
  return (
    <Table.Column
      header={title}
      accessorKey="id"
      id="employee"
      cell={({ row: { original } }) => {
        const branchId = original?.id;
        const filteredAgent = employeeData?.filter((employee) => employee?.branchId === branchId);
        return (
          <div>
            <Badge className="text-xl font-bold bg-green-500">{filteredAgent?.length ?? 0}</Badge>
          </div>
        );
      }}
    />
  );
}
