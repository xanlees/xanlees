"use client";
import React from "react";
import { Card, CardHeader, CardTitle, Label } from "@src/shadcn/elements";
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
        <div key={index} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 break-words">
          <Show.Row icon={<Building />} className="text-md text-gray-700 dark:text-gray-300 break-words" title="ບໍລິສັດ" content={item.company ?? ""} />
          <Show.Row icon={<Sofa />} className="text-md text-gray-700 dark:text-gray-300 break-words" title="ຕໍາແໜງ" content={item.position ?? ""} />
          <Show.Row icon={<Clock />} className="text-md text-gray-700 dark:text-gray-300 break-words" title="ໄລຍະເວລາ" content={item.time ?? ""} />
          <Show.Row icon={<DollarSign />} className="text-md text-gray-700 dark:text-gray-300 break-words" title="ເງິນເດືອນ" content={`${item.salary?.toLocaleString() ?? ""} ກີບ`} />
          <Label className="block p-2 px-5 leading-relaxed hover:text-blue-500">
            <div className=" flex flex-wrap">
              <div className="ml-1 flex ">
                <Briefcase/>
                <div className="ml-3 text-[15px] text-gray-700 dark:text-gray-300 break-words ">ໜ້າວຽກ</div>
                <i className={`icon-left-margin ${""}`} />
              </div>
              <div className="break-words">
                {item.reasonOfResignation ?? ""}
              </div>
            </div>
          </Label>
        </div>
      ))}
    </Card>
  );
};
