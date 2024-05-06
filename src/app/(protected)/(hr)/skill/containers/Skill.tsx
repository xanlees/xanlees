"use client";
import React from "react";
import { Card, CardHeader, CardTitle, Label } from "@src/shadcn/elements";
import { type ISkill } from "../interface";

export const Skill: React.FC<{ skillData: ISkill[] | null | undefined }> = ({ skillData }) => {
  return (
    <Card className="shadow-xl pb-3 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white h-fit">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ຄວາມສາມາດພິເສດ"}
        </CardTitle>
      </CardHeader>
      {skillData?.map((item, index) => (
        <div key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 w-full">
          <Label className="block p-2 px-5 leading-relaxed hover:text-blue-500">
            <i className={`icon-left-margin ${item?.proficiency}`} />
            <div className="break-words">
              {`${index + 1}: ${item?.name ?? ""} ລະດັບ${getProficiency(item?.proficiency)}`}
            </div>
          </Label>
        </div>
      ))}
    </Card>
  );
};
export const getProficiency = (proficiency: string | null | undefined): string => {
  switch (proficiency) {
    case "Good":
      return "ດີ";
    case "Fair":
      return "ປານກາງ";
    case "Poor":
      return "ພໍໃຊ້ໄດ້";
    default:
      return "";
  }
};

