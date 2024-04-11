"use client";
import { Show } from "@/shadcn/components/crud";
import React from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import moment from "moment";
import { type IEducation } from "@personal";

export function EducationDetail({ educationData }: { educationData: IEducation[] }): JSX.Element {
  return (
    <Card className="shadow-xl pb-3 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white h-fit ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ຂໍ້ມູນການສຶກສາ"}
        </CardTitle>
      </CardHeader>
      <div className="px-4 py-2">
        {educationData?.map((item) => {
          return (
            <Show.Row
              key={item.id}
              className="text-md text-gray-700 dark:text-gray-300"
              title={"ລະດັບຈົບການສຶກສາວິຊາສະເພາະ"}
              content={`${item.graduationId.degree}, ${item.graduationId.sector}, ${item?.branch}, ຈົບສົກປີ ${moment(item?.year).format("YYYY")}`}
            />
          );
        })}
      </div>
    </Card>
  );
}
