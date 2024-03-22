import type { IDocument } from "./document/interface";
import type { IGraduation } from "./graduation/interface";
import type { IEducation } from "./education/interface";
import type { IAddress } from "./address/interface";
import { type ProfileState } from "./context/interface";

import { PersonalAddressForm } from "./address/containers/form/form";
import { DocumentForm } from "./document/containers/form/form";
import { EducationForm } from "./education/containers/form/form";
import { ProfileForm } from "./profile/containers/form/form";
import { PhysicalProfile } from "./physical/containers/form/form";
import { useProfileContext, ProfileProvider } from "./context";
export type { IDocument, IGraduation, IEducation, IAddress, ProfileState };
export { PersonalAddressForm, DocumentForm, EducationForm, ProfileForm, PhysicalProfile, useProfileContext, ProfileProvider };
