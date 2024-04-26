import { branchColumn } from "./branch/containers/column/branch";
import { FormSector } from "./sector/form/form";
import { getLatestPosition, Position } from "./agent/containers/column";
import { positionsColumn } from "./branch/containers/column/positions";
import { sectorColumn } from "./branch/containers/column/sector";
import { useBranchID, useSector } from "./branch/hook/useSector";
import { usePosition } from "./position/hook";
import { useTableBranch } from "./branch/hook/useTableBranch";

import type { IBranch } from "./branch/interface";
import { useProfileContext } from "@src/app/(protected)/(personal)";
import { AddressDetail, DocumentPDF, ProfileDetail } from "../(personal)/profile/containers/card";
import { useEmployees, usePersonalAddress, useProfile } from "../(personal)/profile/hooks";
import { useSectorId } from "../(personal)/profile/hooks/show";
import { type ISector } from "./sector/interface";
import { type IPosition } from "./position/interface";
import { FullNameColumn } from "../(personal)/profile/containers/table-column";
import { useTableProfile } from "../(personal)/profile/containers/table/useTableConfig";
import { type IEmployee } from "./employee/interface";

export {
  useProfileContext,
  AddressDetail,
  DocumentPDF,
  ProfileDetail,
  useEmployees,
  usePersonalAddress,
  useProfile,
  useSectorId,
  useBranchID,
  useSector,
  usePosition,
  positionsColumn,
  branchColumn,
  sectorColumn,
  useTableBranch,
  FormSector,
  Position,
  FullNameColumn,
  getLatestPosition,
  useTableProfile as useTableConfig,

};
export type { IEmployee, IBranch, ISector, IPosition };
