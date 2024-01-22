import { ApplicationForm } from "../components/form";
import { PersonalAddressForm } from "../components/form/address/components/form/form";
import { DocumentForm } from "../components/form/document/components/form/form";
import { ProfileForm } from "../components/form/profile/components/form";
import { Success } from "../components/form/sussess";
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
    stepLabel: "ສ້າງໂປຣໄຟລ໌",
    stepDescription: (
      <ProfileForm redirect="create" setCurrentStep={undefined} />
    ),
    completed: false,
  },
  {
    stepLabel: "ເອກສານ",
    stepDescription: (
      <DocumentForm redirect="create" setCurrentStep={undefined} />
    ),
    completed: false,
  },
  {
    stepLabel: "ຟອມສະໝັກວຽກ",
    stepDescription: (
      <ApplicationForm redirect="create" setCurrentStep={undefined} />
    ),
    completed: false,
  },
  {
    stepLabel: "ປະສົບການເຮັດວຽກ",
    stepDescription: (
      <WorkExperienceForm redirect="create" setCurrentStep={undefined} />
    ),
    completed: false,
  },
  {
    stepLabel: "ສໍາເລັດ",
    stepDescription: (
      <Success />
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
