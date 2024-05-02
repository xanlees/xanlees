import { branchColumn } from "./branch/containers/column/branch";
import { FormSector } from "./sector/form/form";
import { getLatestPosition, Position } from "./agent/containers/column";
import { positionsColumn } from "./branch/containers/column/positions";
import { sectorColumn } from "./branch/containers/column/sector";
import { useBranchID, useSector } from "./branch/hook/useSector";
import { usePosition } from "./position/hook";
import { useTableBranch } from "./branch/hook/useTableBranch";

import type { IBranch } from "./branch/interface";
import { type ISector } from "./sector/interface";
import { type IPosition } from "./position/interface";
import { type IEmployee } from "./employee/interface";

export {
  useBranchID,
  useSector,
  usePosition,
  positionsColumn,
  branchColumn,
  sectorColumn,
  useTableBranch,
  FormSector,
  Position,
  getLatestPosition,

};
export type { IEmployee, IBranch, ISector, IPosition };
