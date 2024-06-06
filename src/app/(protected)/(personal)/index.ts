import { useTableProfile } from "./profile/containers/table/useTableConfig";
import { DocumentForm } from "./document/containers/form/form";
import { EducationForm } from "./education/containers/form/form";
import { PersonalAddressForm } from "./personal_address/containers/form";
import { PhysicalProfile } from "./physical/containers/form/form";
import { ProfileForm } from "./profile/containers/form/form";
import { agentProfileStorageKey, employeeProfileStorageKey, ProfileProvider, useProfileContext, applicationProfileStorageKey } from "./context";
import { ProfileDetail } from "./profile/containers/card/ProfileDetail";
import { useProfile } from "./profile/hooks";
import type { IDocument } from "./document/interface";
import type { IGraduation } from "./graduation/interface";
import type { IEducation } from "./education/interface";
import type { IAddress, IDistrict } from "./personal_address/interface";
import type { ProfileState } from "./context/interface";
import { type IProfile } from "./profile/interface/model";
import { type IPhysical } from "./physical/interface";
import { Physical } from "./physical/containers/Physical";
import { AddressDetail, DocumentPDF, EducationDetail } from "./profile/containers/card";
import { useDistrictSelect, useProvinceSelect } from "./personal_address/hook/useDistrictSelect";

export type {
  IDocument,
  IGraduation,
  IEducation,
  IAddress,
  ProfileState,
  IProfile,
  IPhysical,
  IDistrict,
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
};
