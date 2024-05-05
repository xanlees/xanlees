import { getLatestPosition, Position } from "./agent/containers/column";
import { branchColumn } from "./branch/containers/column/branch";
import { sectorColumn } from "./branch/containers/column/sector";
import { useBranchTable } from "./branch/hook/table";
import { type IEmployee } from "./employee/interface";
import { usePosition } from "./position/hook";
import { type IPosition } from "./position/interface";
import { SectorForm } from "./sector/component";
import { type ISector } from "./sector/interface";

import type { IBranch } from "./branch/interface";
export {
  usePosition,
  branchColumn,
  sectorColumn,
  useBranchTable as useTableBranch,
  SectorForm as FormSector,
  Position,
  getLatestPosition,

};
export type { IEmployee, IBranch, ISector, IPosition };
