import { PersonalAddressForm } from "@src/app/(protected)/(personal)/address/components/form";
import { EducationForm } from "@src/app/(protected)/(personal)/education/components/form";
import { GraduationForm } from "@src/app/(protected)/(personal)/graduation/form";
import { ProfileForm } from "@src/app/(protected)/(personal)/profile/components/form";

export const createEmployeeSteps = [
  {
    stepLabel: "Personal Address",
    stepDescription: <PersonalAddressForm redirect="create" />,
    completed: false,
  },
  {
    stepLabel: "Creating Profile",
    stepDescription: <ProfileForm redirect="create" />,
    completed: false,
  },
  {
    stepLabel: "Create Graduation",
    stepDescription: <GraduationForm redirect="create" />,
    completed: false,
  },
  {
    stepLabel: "Create Education",
    stepDescription: <EducationForm redirect="create" />,
    completed: false,
  },
];
