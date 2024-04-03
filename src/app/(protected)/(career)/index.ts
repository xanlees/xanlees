import { type IEmployee } from "./employee";
import type { ISector, IPosition, IBranch } from "./branch/interface";
import { useProfileContext } from "@src/app/(protected)/(personal)";
import { AddressDetail, DocumentPDF, EmployeeDetail, ProfileDetail } from "../(personal)/profile/containers/card";
import { useEmployees, usePersonalAddress, useProfile } from "../(personal)/profile/hooks";
import { useSector, useSectorId } from "../(personal)/profile/hooks/show";
import { useBranchID, usePosition, useTableBranch } from "./branch/hook";
import { positionsColumn } from "./branch/containers/column/positions";
import { branchColumn } from "./branch/containers/column/branch";
import { sectorColumn } from "./branch/containers/column/sector";
import { FormSector } from "./sector/form/form";
import { Position } from "./position/containers/form";

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
export type { IEmployee, ISector, IPosition, IBranch };
