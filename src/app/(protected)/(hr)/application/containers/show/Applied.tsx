"use client";

import { CircleDashed } from "lucide-react";
import { IApplication } from "../../interface";

export const Applied: React.FC<{ record?: IApplication, header: string }> = ({ record, header }) => {
  const expectedSalary = record?.expectedSalary ?? "";
  const positionAppliedFor = record?.positionAppliedFor ?? "";
  const numericSalary = parseFloat(expectedSalary);
  const formattedSalary = numericSalary?.toLocaleString()
  return (
    <div className="flex flex-wrap">
      <div className="flex w-full h-12 my-auto mb-4 text-xl font-bold text-center sm:w-1/4">
        {header}
      </div>
      <div className="flex flex-wrap w-full sm:flex sm:w-1/2 ">
        <div className="flex w-1/2 sm:w-1/2 gap-x-2">
          <CircleDashed className="w-5 h-5 mt-0.5" />
          <div className="">{`ຕໍາແໜ່ງ: ${positionAppliedFor}`}</div>
        </div>
        <div className="flex w-1/2 sm:w-1/2 gap-x-2">
          <CircleDashed className="w-5 h-5 mt-0.5" />
          <div className="">{`ເງິນທີຕ້ອງການ: ${formattedSalary} ກີບ`}</div>
        </div>
      </div>
    </div>
  );
}
