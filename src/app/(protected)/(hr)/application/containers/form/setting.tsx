import { ProfileForm, PhysicalProfile, DocumentForm, EducationForm } from "@personal";
import { ApplicationForm } from ".";
import { WorkExperienceForm } from "@hr";
import { Success } from "../form-fields/successSubmit";
import { PersonalBornAddressForm } from "@src/app/(protected)/(personal)/address/PersonalAddressContainers";

export const applicationFromStep = [
  {
    stepLabel: "ສ້າງທີຢູ່",
    stepDescription: (
      <PersonalBornAddressForm />
    ),
    completed: false,
  },
  {
    stepLabel: "ສ້າງໂປຣໄຟລ໌",
    stepDescription: <ProfileForm isEmployee={false}/>,
    completed: false,
  },
  {
    stepLabel: "ສ້າງໂປຣໄຟລ",
    stepDescription: <PhysicalProfile />,
    completed: false,
  },
  {
    stepLabel: "ເອກສານ",
    stepDescription: (
      <DocumentForm/>
    ),
    completed: false,
  },
  {
    stepLabel: "ສ້າງທີ່ຈົບການສຶກສາວິຊາສະເພາະ",
    stepDescription: <EducationForm/>,
    completed: false,
  },
  {
    stepLabel: "ຟອມສະໝັກວຽກ",
    stepDescription: (
      <ApplicationForm/>
    ),
    completed: false,
  },
  {
    stepLabel: "ປະສົບການເຮັດວຽກ",
    stepDescription: (
      <WorkExperienceForm/>
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

