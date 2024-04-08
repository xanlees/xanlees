import { ProfileForm, PhysicalProfile, DocumentForm, EducationForm } from "@personal";
import { Application2Form, ApplicationForm } from "./index";
import { WorkExperienceForm } from "@hr";
import { PersonalAddressForm } from "@src/app/(protected)/(personal)/address/containers/form";
import { Skill } from "../../../skill/containers/form/form";

export const applicationFromStep = [
  {
    stepLabel: "ຂໍ້ມູນສ່ວນບຸກຄົນ",
    stepDescription: <ProfileForm isEmployee={false} type="EMPLOYEE_CANDIDATE"/>,
    completed: false,
  },
  {
    stepLabel: "ທີຢູ່ບ້ານເກີດ",
    stepDescription: (
      <PersonalAddressForm isCurrent={false}/>
    ),
    completed: false,
  },
  {
    stepLabel: "ທີຢູ່ປະຈຸປບັນ",
    stepDescription: (
      <PersonalAddressForm />
    ),
    completed: false,
  },
  {
    stepLabel: "ຂໍ້ມູນທົ່ວໄປ",
    stepDescription: <PhysicalProfile />,
    completed: false,
  },
  {
    stepLabel: "ເອກສານຄັດຕິດ",
    stepDescription: (
      <DocumentForm label="ລາຍການເອກະສານເຊັ່ນ ໃບປະກາດ, ໃບຕະແນນ, ຊີວະປະຫວັດຫຍໍ້  (ກະລຸນາກົດເພີ່ມເອກະສານກ່ອນບັນທືກ)"/>
    ),
    completed: false,
  },
  {
    stepLabel: "ສ້າງທີ່ຈົບການສຶກສາວິຊາສະເພາະ",
    stepDescription: <EducationForm/>,
    completed: false,
  },
  {
    stepLabel: "ສະໝັກຕໍາແຫນ່ງ",
    stepDescription: <ApplicationForm/>,
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
    stepLabel: "ຄວາມສາມາດພິເສດ",
    stepDescription: (
      <Skill/>
    ),
    completed: false,
  },
  {
    stepLabel: "ຂໍ້ມູນທົ່ວໄປ",
    stepDescription: (
      <Application2Form/>
    ),
    completed: true,
  },
];

