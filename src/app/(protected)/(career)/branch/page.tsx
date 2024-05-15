"use client";

import { useState } from "react";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { getActionsColumn } from "@src/common/containers/column";

import { type IEmployeeExpandProfile } from "../employee/interface";
import { type IPosition } from "../position/interface";
import { branchColumn, employeeColumn, positionsColumn, ProvinceColumn } from "./containers/column";
import { sectorColumn } from "./containers/column/sector";
import { useBranchTable, useEmployee, usePosition, useSector } from "./hook/table";
import { getBranchIds, getPositionIds } from "./lib";
import { SelectProvince } from "./containers/selectProvince";
import { type ISector } from "../sector/interface";

const title = "ພະແນກ/ຂະແໜງ";
const type = "HEADQUARTERS,BRANCH,OFFICE";

export default function BranchList(): JSX.Element {
  const [selected, setSelected] = useState<number | undefined>();
  const { table } = useBranchTable({ type, province: selected });
  const branch = table.options.data ?? [];
  const branchIds = getBranchIds(branch);
  const pageSize = usePosition<IPosition>({ branchIds, pageSize: true })?.total;
  const positionData = usePosition<IPosition>({ branchIds, pageSize: false, page: pageSize })?.data;
  const positionIds = getPositionIds(positionData);
  const employeeData = useEmployee<IEmployeeExpandProfile>({ positionId: positionIds, pageSize })?.data;
  const sectorData = useSector<ISector>({ branchId: branchIds, pageSize })?.data;
  return (
    <div className="mx-auto">
      <List>
        <SelectProvince setSelected={setSelected} />
        <Table table={table} SearchBarTitle="ຄົ້ນຫາ">
          {ProvinceColumn()}
          {branchColumn({ title: "ສັງກັດຫ້ອງການ" })}
          {sectorColumn({ title, sectorData })}
          {positionsColumn({ positionData })}
          {employeeColumn({ employeeData, title: "ພະນັກງານ (ສັງກັດຕາມສີ ພນ/ຂໜ)" })}
          {getActionsColumn({ resource: "branch", hideShow: true })}
        </Table>
      </List>
    </div>
  );
}

