import { type IEmployee } from "./employee";
import type { IBranch } from "./branch/interface";
import { useProfileContext } from "@src/app/(protected)/(personal)";
import { AddressDetail, DocumentPDF, EmployeeDetail, ProfileDetail } from "../(personal)/profile/containers/card";
import { useEmployees, usePersonalAddress, useProfile } from "../(personal)/profile/hooks";
import { useSectorId } from "../(personal)/profile/hooks/show";
import { positionsColumn } from "./branch/containers/column/positions";
import { branchColumn } from "./branch/containers/column/branch";
import { sectorColumn } from "./branch/containers/column/sector";
import { useBranchID, useSector } from "./branch/hook/useSector";
import { usePosition } from "./position/hook";
import { useTableBranch } from "./branch/hook/useTableBranch";
import { FormSector } from "./sector/form/form";
import { Position } from "./agent/containers/column";
import { ISector } from "./sector/interface";
import { IPosition } from "./position/interface";

export {
  useProfileContext, AddressDetail
  , DocumentPDF,
  EmployeeDetail,
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

};
export type { IEmployee, IBranch, ISector, IPosition };
