"use client";

import React from "react";

import { Create } from "@/shadcn/components/crud";

import { HolidayForm } from "../container/form/form";
import FormStep from "@src/common/components/stepForm";
import { BranchHolidayForm } from "../container/form/formbranch";
import { Card } from "@src/shadcn/elements";

export default function HolidayCreate(): JSX.Element {
  return (
    <Create title="ວັນພັກ" resource="holiday" >
      <Card className="mx-auto mt-10 mb-20 rounded-md shadow-lg max-w-[900px]">
        <div className="p-4 shadow-lg sm:p-6 lg:p-8">
          <div className="p-4 mx-2 my-3 text-center bg-blue-500 rounded-sm text-white">
            <p className="text-xl font-bold">ຟອມວັນພັກ </p>
          </div>
          <FormStep formStepsData={FromStepData} initialStep={0} />
        </div>
      </Card>
    </Create>
  );
}

export const FromStepData = [
  {
    stepLabel: "ຟອມວັນພັກ",
    stepDescription: <HolidayForm />,
    completed: false,
  },
  {
    stepLabel: "ກຳນົດວັນພັກສະເພາະສາຂາ",
    stepDescription: <BranchHolidayForm />,
    completed: false,
  },
];
