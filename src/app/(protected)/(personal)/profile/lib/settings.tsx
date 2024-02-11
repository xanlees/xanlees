import { ProfileForm } from "@src/app/(protected)/(personal)/profile/components/form";
import { EducationForm } from "../../education/components/form";
import { DocumentForm } from "../../document/components/form/form";
import { PersonalAddressForm } from "../../address/components/form/form";
import { ApplicationForm } from "@src/app/(protected)/(hr)/application/components/form";
import { WorkExperienceForm } from "@src/app/(protected)/(hr)/work_experience/components/form/form";
import { Success } from "@src/app/(protected)/(hr)/application/containers/form/successSubmit";
import { PhysicalProfile } from "../../physical_profile/components/form/form";

export const formStepsData = [
  {
    stepLabel: "ສ້າງທີຢູ່",
    stepDescription: (
      <PersonalAddressForm showHouseNo={true}/>
    ),
    completed: false,
  },
  {
    stepLabel: "ສ້າງໂປຣໄຟລ໌",
    stepDescription: <ProfileForm isEmployee={true} />,
    completed: false,
  },
  {
    stepLabel: "ເອກສານ",
    stepDescription: <DocumentForm/>,
    completed: false,
  },
  {
    stepLabel: "ສ້າງທີ່ຈົບການສຶກສາວິຊາສະເພາະ",
    stepDescription: <EducationForm />,
    completed: false,
  },
];

export const applicationFromStep = [
  {
    stepLabel: "ສ້າງທີຢູ່",
    stepDescription: (
      <PersonalAddressForm showHouseNo={false}/>
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
