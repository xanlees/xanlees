"use client";

import { useState } from "react";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { getActionsColumn, SequenceColumn } from "@src/common/containers/column";

import {
  branchColumn, employeeColumn, ProvinceColumn, sectorColumn,
} from "../branch/containers/column";
import { SelectProvince } from "../branch/containers/selectProvince";
import { useBranchTable, useEmployee, usePosition, useSector } from "../branch/hook/useTable";
import { getBranchIds, getPositionIds } from "../branch/lib";
import { type IEmployeeExpandProfile } from "../employee/interface";
import { type IPosition } from "../position/interface";
import { type ISector } from "../sector/interface";

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
          {ProvinceColumn()}
          {branchColumn({ title: "ເມືອງ" })}
          {sectorColumn({ title, sectorData })}
          {employeeColumn({ employeeData, title: "ສະມາຊິກ (ສັງກັດຕາມສີ)" })}
          {getActionsColumn({ resource: "branch", hideShow: true })}
        </Table>
      </List>
    </div>
  );
}
