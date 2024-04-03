import { DocumentForm } from "./document/containers/form/form";
import { EducationForm } from "./education/containers/form/form";
import { PersonalAddressForm } from "./address/containers/form";
import { PhysicalProfile } from "./physical/containers/form/form";
import { ProfileForm } from "./profile/containers/form/form";
import { ProfileProvider, useProfileContext } from "./context";

import type { IDocument } from "./document/interface";
import type { IGraduation } from "./graduation/interface";
import type { IEducation } from "./education/interface";
import type { IAddress } from "./address/interface";
import type { ProfileState } from "./context/interface";
import { Application2Form } from "../(hr)/application/containers/form";

export type { IDocument, IGraduation, IEducation, IAddress, ProfileState };
export { DocumentForm, EducationForm, ProfileForm, PhysicalProfile, useProfileContext, ProfileProvider, PersonalAddressForm, Application2Form };

