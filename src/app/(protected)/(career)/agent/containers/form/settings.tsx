import { DocumentForm, EducationForm, PersonalAddressForm } from "@personal";
import { ProfileForm } from "./form";
export const formStepsData = [
  {
    stepLabel: "ສ້າງໂປຣໄຟລ໌",
    stepDescription: <ProfileForm isEmployee={true}/>,
    completed: false,
  },
  {
    stepLabel: "ສ້າງທີຢູ່",
    stepDescription: (
      <PersonalAddressForm showHouseNo={true}/>
    ),
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
