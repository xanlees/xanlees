import { ApplicationForm } from "../components/form";
import { PersonalAddressForm } from "../components/form/address/components/form/form";
import { DocumentForm } from "../components/form/document/components/form/form";
import { ProfileForm } from "../components/form/profile/components/form";
import { WorkExperienceForm } from "../components/form/work_experience/components/form/form";

export const applicationFromStep = [
  {
    stepLabel: "ສ້າງທີຢູ່",
    stepDescription: (
      <PersonalAddressForm redirect="create" setCurrentStep={undefined} />
    ),
    completed: false,
  },
  {
    stepLabel: "ProfileForm",
    stepDescription: (
      <ProfileForm redirect="create" setCurrentStep={undefined} />
    ),
    completed: false,
  },
  {
    stepLabel: "DocumentForm",
    stepDescription: (
      <DocumentForm redirect="create" setCurrentStep={undefined} />
    ),
    completed: false,
  },
  {
    stepLabel: "ApplicationForm",
    stepDescription: (
      <ApplicationForm redirect="create" setCurrentStep={undefined} />
    ),
    completed: false,
  },
  {
    stepLabel: "WorkExperienceForm",
    stepDescription: (
      <WorkExperienceForm redirect="create" setCurrentStep={undefined} />
    ),
    completed: false,
  },
];


export const typeOfUniqueNumber = [
  {
    label: "ເລກເຄື່ອງຂາຍເລກ",
    value: "MACHINE",
  },
  {
    label: "ເລກບັດປະຈໍາຕົວ",
    value: "IDENTIFY",
  },
  {
    label: "ປື້ມສໍາມະໂມຄົວເລກທີ",
    value: "CENSUS_BOOK",
  },
];
