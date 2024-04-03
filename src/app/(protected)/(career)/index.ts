import { type IEmployee } from "./employee";
import type { ISector, IPosition, IBranch } from "./branch/interface";
import { useProfileContext } from "@src/app/(protected)/(personal)";
import { AddressDetail, DocumentPDF, EmployeeDetail, ProfileDetail } from "../(personal)/profile/containers/card";
import { useEmployees, usePersonalAddress, useProfile } from "../(personal)/profile/hooks";
import { useSector, useSectorId } from "../(personal)/profile/hooks/show";

export {
  useProfileContext, AddressDetail
  , DocumentPDF,
  EmployeeDetail,
  ProfileDetail,
  useEmployees,
  usePersonalAddress,
  useProfile,
  useSector,
  useSectorId,
};
export type { IEmployee, ISector, IPosition, IBranch };
