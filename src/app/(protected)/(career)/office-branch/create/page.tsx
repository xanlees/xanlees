"use client";
import React from "react";
import { Create } from "@/shadcn/components/crud";
import FormStep from "@src/common/components/stepForm";
import { ProfileProvider } from "@src/app/(protected)/(personal)";
import { FormSector, Position } from "../../index";
import { FormBranch } from "../containers/form";

const ProfileCreate = () => {
  return (
    <ProfileProvider>
      <FormCreate />
    </ProfileProvider>
  );
};

const FormCreate = () => {
  return (
    <Create title={"ຟອມສ້າງພະນັກງານ"} resource="profile">
      <div className="flex justify-center">
        <div className="flex flex-col border shadow-2xl rounded-2xl">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">ຟອມສ້າງພະນັກງານ</div>
          <FormStep formStepsData={formStepsData} initialStep={0} />
        </div>
      </div>
    </Create>
  );
};

export const formStepsData = [
  {
    stepLabel: "ສ້າງສາຂາ",
    stepDescription: <FormBranch />,
    completed: false,
  },
  {
    stepLabel: "*ຊອກຂະແໜງບໍ່ເຫັນ, ກົດທີ່ນີ້",
    stepDescription: <FormSector />,
    completed: false,
  },
  {
    stepLabel: "*ຊອກຂະແໜງບໍ່ເຫັນ, ກົດທີ່ນີ້",
    stepDescription: <Position redirect={false} />,
    completed: false,
  },

];

export default ProfileCreate;
