import { PersonalAddressForm } from "@src/app/(protected)/(personal)/address/components/form";
import { ProfileForm } from "@src/app/(protected)/(personal)/profile/components/form";
import { EducationForm } from "../../education/components/form";

export const createEmployeeSteps = [
  {
    stepLabel: "ສ້າງທີຢູ່",
    stepDescription: <PersonalAddressForm redirect="create" setCurrentStep={undefined} />,
    completed: false,
  },
  {
    stepLabel: "ສ້າງໂປຣໄຟລ໌",
    stepDescription: <ProfileForm redirect="create" setCurrentStep={undefined}/>,
    completed: false,
  },
  {
    stepLabel: "ສ້າງທີ່ຈົບການສຶກສາວິຊາສະເພາະ",
    stepDescription: <EducationForm redirect="create" />,
    completed: false,
  },
];
