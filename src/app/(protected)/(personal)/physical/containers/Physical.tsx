"use client";
import { Show } from "@/shadcn/components/crud";
import React from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { type IPhysical } from "@src/app/(protected)/(personal)/physical/interface";

export const Physical: React.FC<{ physicalData: IPhysical[] | null | undefined }> = ({ physicalData }) => {
  const { nationality, height, weight } = physicalData?.[0] ?? {};
  return (
    <Card className="shadow-xl pb-3 rounded-lg w-full sm:w-80 bg-white dark:bg-gray-800 dark:text-white h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ຂໍ້ມູນທົ່ວໄປ"}
        </CardTitle>
      </CardHeader>
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ສັນຊາດ"} content={nationality ?? "ບໍມີຂໍ້ມູນ"} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ລວງສູງ"} content={`${weight ?? "ບໍມີຂໍ້ມູນ"} Kg`} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ນໍ້າຫນັກ"} content={`${height ?? "ບໍມີຂໍ້ມູນ"} Cm`} />
    </Card>
  );
};
