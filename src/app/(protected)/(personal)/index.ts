import {
  agentProfileStorageKey, applicationProfileStorageKey, employeeProfileStorageKey,
  ProfileProvider, useProfileContext,
} from "./context";
import { DocumentForm } from "./document/containers/form/form";
import { EducationForm } from "./education/containers/form/form";
import { PersonalAddressForm } from "./personal_address/containers/form";
import { useDistrictSelect, useProvinceSelect } from "./personal_address/hook/useDistrictSelect";
import { PhysicalProfile } from "./physical/containers/form/form";
import { Physical } from "./physical/containers/Physical";
import { type IPhysical } from "./physical/interface";
import { AddressDetail, DocumentPDF, EducationDetail } from "./profile/containers/card";
import { ProfileDetail } from "./profile/containers/card/ProfileDetail";
import { ProfileForm } from "./profile/containers/form/form";
import { useTableProfile } from "./profile/containers/table/useTableConfig";
import { useProfile } from "./profile/hooks";
import { type IProfile } from "./profile/interface/model";
import { type IUserProfile } from "./user-profile/interface";

import type { IDocument } from "./document/interface";
import type { IGraduation } from "./graduation/interface";
import type { IEducation } from "./education/interface";
import type { IAddress, IDistrict } from "./personal_address/interface";
import type { ProfileState } from "./context/interface";
import { useTableUserProfile } from "./user-profile/hook";
import { FullNameColumn } from "./user-profile/containers/column";

export type {
  IDocument,
  IGraduation,
  IEducation,
  IAddress,
  ProfileState,
  IProfile,
  IPhysical,
  IDistrict,
  IUserProfile,
};
export {
  DocumentForm,
  EducationForm,
  ProfileForm,
  PhysicalProfile,
  ProfileProvider,
  Physical,
  DocumentPDF,
  employeeProfileStorageKey,
  agentProfileStorageKey,
  applicationProfileStorageKey,
  FullNameColumn,
};
export {
  useProfile,
  useTableProfile as useTableConfig,
  useProfileContext,
  PersonalAddressForm,
  ProfileDetail,
  EducationDetail,
  AddressDetail,
  useDistrictSelect,
  useProvinceSelect,
  useTableUserProfile,
};
