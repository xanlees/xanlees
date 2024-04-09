"use client";
import { Show } from "@/shadcn/components/crud";
import React from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { type IWorkExperience } from "../interface";

export const WorkExperience: React.FC<{ workExperienceData: IWorkExperience[] | null | undefined }> = ({ workExperienceData }) => {
  return (
    <Card className="shadow-xl pb-3 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white h-fit ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ປະສົບການ"}
        </CardTitle>
      </CardHeader>
      {workExperienceData?.map((item, index) => (
        <div key={index}>
          <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ບໍລິສັດ"} content={item?.company ?? ""} />
          <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ຕໍາແໜງ"} content={item?.position ?? ""} />
          <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ໄລຍະເວລາ"} content={item?.time ?? ""} />
          <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ເງິນເດືອນ"} content={`${Number(item?.salary)?.toLocaleString() ?? ""} ກີບ`} />
          <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ວຽກທີເຮັດຜ່ານມາ"} content={item?.reasonOfResignation ?? ""} />
        </div>
      ))}
    </Card>
  );
};
