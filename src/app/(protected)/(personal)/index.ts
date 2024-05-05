import { useTableProfile } from "./profile/containers/table/useTableConfig";
import { DocumentForm } from "./document/containers/form/form";
import { EducationForm } from "./education/containers/form/form";
import { PersonalAddressForm } from "./address/containers/form";
import { PhysicalProfile } from "./physical/containers/form/form";
import { ProfileForm } from "./profile/containers/form/form";
import { ProfileProvider, useProfileContext } from "./context";
import { ProfileDetail } from "./profile/containers/card/ProfileDetail";
import { useProfile } from "./profile/hooks";
import type { IDocument } from "./document/interface";
import type { IGraduation } from "./graduation/interface";
import type { IEducation } from "./education/interface";
import type { IAddress } from "./address/interface";
import type { ProfileState } from "./context/interface";
import { type IProfile } from "./profile/interface/model";
import { type IPhysical } from "./physical/interface";
import { Physical } from "./physical/containers/Physical";
import { AddressDetail, DocumentPDF, EducationDetail } from "./profile/containers/card";
import { useDistrictSelect, useProvinceSelect } from "./address/hook/useDistrictSelect";

export type {
  IDocument,
  IGraduation,
  IEducation,
  IAddress,
  ProfileState,
  IProfile,
  IPhysical,
};
export {
  DocumentForm,
  EducationForm,
  ProfileForm,
  PhysicalProfile,
  ProfileProvider,
  Physical,
  DocumentPDF,
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
