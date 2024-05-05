"use client";

import { useState } from "react";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useProvinceSelect } from "@personal";
import { getActionsColumn } from "@src/common/containers/column";
import { ComboboxSelect } from "@src/shadcn/elements/combobox-select";

import { type IEmployeeExpandProfile } from "../employee/interface";
import { type IPosition } from "../position/interface";
import { type IBranch, type ISector } from "../sector/interface";
import { branchColumn, employeeColumn, positionsColumn, ProvinceColumn } from "./containers/column";
import { sectorColumn } from "./containers/column/sector";
import { useBranchTable, useEmployee, usePosition, useSector } from "./hook/table";

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
          {branchColumn()}
          {sectorColumn({ title, sectorData })}
          {positionsColumn({ positionData })}
          {employeeColumn({ employeeData, positionData })}
          {getActionsColumn({ resource: "branch", hideEdit: true, hideShow: true })}
        </Table>
      </List>
    </div>
  );
}

export function getBranchIds(branch: IBranch[]) {
  const branchIDs = branch.map((item) => item.id);
  if (branchIDs) {
    return branchIDs;
  }
  return [];
}

export function getPositionIds(positionData: IPosition[]) {
  const positionI = positionData.map((item) => item.id);
  if (positionI) {
    return positionI;
  }
  return [];
}

interface SelectProvinceProps {
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>
}

function SelectProvince({ setSelected }: SelectProvinceProps): JSX.Element {
  const handlePeriodChange = (id: number) => {
    setSelected(id);
  };
  const province = useProvinceSelect();
  return (
    <div className="flex p-4 bg-white rounded-lg shadow-md w-fit gap-x-5 ">
      <div>
        <div className="mb-2 text-lg font-semibold text-gray-700">ແຂວງ</div>
        <ComboboxSelect options={province.options} onChange={handlePeriodChange} label="" className="w-[300px]" defaultValue={""}/>
      </div>
    </div>
  );
}
