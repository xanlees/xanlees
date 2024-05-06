import {
  ProfileForm,
  PhysicalProfile,
  DocumentForm,
  EducationForm,
} from "@personal";
import { Application2Form, ApplicationForm } from "./index";
import { WorkExperienceForm } from "@hr";
import { PersonalAddressForm } from "@src/app/(protected)/(personal)/address/containers/form";
import { Skill } from "../../../skill/containers/form/form";

export const applicationFromStep = [
  {
    stepLabel: "ຂໍ້ມູນສ່ວນບຸກຄົນ",
    stepDescription: (
      <ProfileForm isEmployee={false} type="EMPLOYEE_CANDIDATE" user={0} />
    ),
    completed: false,
  },
  {
    stepLabel: "ບ້ານເກີດ",
    stepDescription: <PersonalAddressForm isCurrent={false} />,
    completed: false,
  },
  {
    stepLabel: "ທີຢູ່ປະຈຸບັນ",
    stepDescription: <PersonalAddressForm />,
    completed: false,
  },
  {
    stepLabel: "ຂໍ້ມູນທົ່ວໄປ",
    stepDescription: <PhysicalProfile />,
    completed: false,
  },
  {
    stepLabel: "ເອກະສານຄັດຕິດ",
    stepDescription: <DocumentForm label="ລາຍການເອກະສານເຊັ່ນ ໃບປະກາດ, ໃບຄະແນນ, ຊີວະປະຫວັດຫຍໍ້  (ກະລຸນາກົດເພີ່ມເອກະສານກ່ອນບັນທືກ)" />,
    completed: false,
  },
  {
    stepLabel: "ປະຫວັດການສຶກສາ",
    stepDescription: <EducationForm />,
    completed: false,
  },
  {
    stepLabel: "ຂໍ້ມູນການສະໝັກ",
    stepDescription: <ApplicationForm />,
    completed: false,
  },
  {
    stepLabel: "ປະສົບການເຮັດວຽກ",
    stepDescription: <WorkExperienceForm />,
    completed: false,
  },
  {
    stepLabel: "ທັກສາ ແລະ ຄວາມສາມາດ",
    stepDescription: <Skill />,
    completed: false,
  },
  {
    stepLabel: "ຂໍ້ມູນການສະໝັກເພີ່ມເຕີມ",
    stepDescription: <Application2Form />,
    completed: false,
  },
];
