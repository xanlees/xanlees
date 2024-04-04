import { ProfileForm, PhysicalProfile, DocumentForm, EducationForm } from "@personal";
import { ApplicationForm } from ".";
import { WorkExperienceForm } from "@hr";
import { PersonalAddressForm } from "@src/app/(protected)/(personal)/address/containers/form";
import { Skill } from "../../../skill/containers/form/form";

export const applicationFromStep = [
  {
    stepLabel: "ຂໍ້ມູນສ່ວນບຸກຄົນ",
    stepDescription: <ProfileForm isEmployee={false}/>,
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
    stepLabel: "ທີຢູ່ບ້ານເກີດ",
    stepDescription: (
      <PersonalAddressForm isCurrent={false}/>
    ),
    completed: false,
  },
  {
    stepLabel: "ຂໍ້ມູນທົ່ວໄປ",
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
    stepLabel: "ຟອມສະໝັກວຽກ",
    stepDescription: (
      <Application2Form/>
    ),
    completed: false,
  },
  {
    stepLabel: "ຄວາມສາມາດ",
    stepDescription: (
      <Skill/>
    ),
    completed: false,
  },
];

