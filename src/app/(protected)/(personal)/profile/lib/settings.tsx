import { PersonalAddressForm } from "@src/app/(protected)/(personal)/address/components/form";
import { ProfileForm } from "@src/app/(protected)/(personal)/profile/components/form";
import { EducationForm } from "../../education/components/form";
import { DocumentForm } from "../../document/components/form";

export const createEmployeeSteps = [
  {
    stepLabel: "ສ້າງທີຢູ່",
    stepDescription: (
      <PersonalAddressForm redirect="create" setCurrentStep={undefined} />
    ),
    completed: false,
  },
  {
    stepLabel: "ສ້າງໂປຣໄຟລ໌",
    stepDescription: <ProfileForm redirect="create" />,
    completed: false,
  },
  {
    stepLabel: "ເອກສານ",
    stepDescription: <DocumentForm redirect="create" />,
    completed: false,
  },
  {
    stepLabel: "ສ້າງທີ່ຈົບການສຶກສາວິຊາສະເພາະ",
    stepDescription: <EducationForm redirect="create" />,
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
