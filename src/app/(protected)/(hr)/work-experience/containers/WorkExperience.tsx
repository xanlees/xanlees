"use client";
import React from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { Building, Sofa, Clock, DollarSign, Briefcase } from "lucide-react";

import { Show } from "@/shadcn/components/crud";
import { type IWorkExperience } from "../interface";

export const WorkExperience: React.FC<{ workExperienceData: IWorkExperience[] | null | undefined }> = ({ workExperienceData }) => {
  if (!workExperienceData) {
    return null;
  }

  return (
    <Card className="shadow-xl pb-3 rounded-lg  bg-white dark:bg-gray-800 dark:text-white w-80">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-lg font-semibold">
          {"ປະສົບການ"}
        </CardTitle>
      </CardHeader>
      {workExperienceData.map((item, index) => (
        <div key={index} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Show.Row icon={<Building />} className="text-md text-gray-700 dark:text-gray-300" title="ບໍລິສັດ" content={item.company ?? ""} />
          <Show.Row icon={<Sofa />} className="text-md text-gray-700 dark:text-gray-300" title="ຕໍາແໜງ" content={item.position ?? ""} />
          <Show.Row icon={<Clock />} className="text-md text-gray-700 dark:text-gray-300" title="ໄລຍະເວລາ" content={item.time ?? ""} />
          <Show.Row icon={<DollarSign />} className="text-md text-gray-700 dark:text-gray-300" title="ເງິນເດືອນ" content={`${item.salary?.toLocaleString() ?? ""} ກີບ`} />
          <Show.Row icon={<Briefcase />} className="text-md text-gray-700 dark:text-gray-300" title="ໜ້າວຽກ" content={item.reasonOfResignation ?? ""}/>
        </div>
      ))}
    </Card>
  );
};
