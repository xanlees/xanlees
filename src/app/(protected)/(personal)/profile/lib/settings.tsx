import { PersonalAddressForm } from "@src/app/(protected)/(personal)/address/components/form";
import { ProfileForm } from "@src/app/(protected)/(personal)/profile/components/form";
import { EducationForm } from "../../education/components/form";

export const createEmployeeSteps = [
  {
    stepLabel: "Personal Address",
    stepDescription: <PersonalAddressForm redirect="create" setCurrentStep={undefined} />,
    completed: false,
  },
  {
    stepLabel: "Creating Profile",
    stepDescription: <ProfileForm redirect="create" setCurrentStep={undefined}/>,
    completed: false,
  },
  {
    stepLabel: "Create Graduation",
    stepDescription: <EducationForm redirect="create" />,
    completed: false,
  },
];
