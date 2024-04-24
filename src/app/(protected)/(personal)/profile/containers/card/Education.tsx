"use client";
import React from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { useTableEducation } from "../table/useTableConfig";
import { getActionsButton } from "@src/common/containers/column/actionCard";
import { CardView } from "@src/shadcn/components/table/card-view";
import { Show } from "@src/shadcn/components/crud";

interface IGraduationId {
  degree?: string
  sector?: string
}

interface IEducationRow {
  graduationId?: IGraduationId
  year?: string
  branch?: string
}
export function EducationDetail({ profileId }: { profileId: number }): JSX.Element {
  const { table } = useTableEducation(profileId);
  return (
    <Card className="shadow-xl pb-3 rounded-lg w-fit bg-white dark:bg-gray-800 dark:text-white h-fit ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ຂໍ້ມູນການສຶກສາ"}
        </CardTitle>
      </CardHeader>
      <CardView table={table} className="w-96" showSearchBar={false} showPagination={false}>
        <CardView.Row
          header=""
          id="id"
          accessorKey="id"
          cell={({ row }) => {
            const rowData = row.original as IEducationRow;
            const graduation = rowData.graduationId ?? {};
            const degree = graduation.degree ?? "Unknown Degree";
            const sector = graduation.sector ?? "Unknown Sector";
            const year = rowData.year ?? "Unknown Year";
            const branch = rowData.branch ?? "Unknown Year";
            return (
              <Show.Row
                className="ຂໍ້ມູນການສຶກສາ"
                content={<div className="-mx-48">{`${degree}, ${sector}, ຈົບທີ${branch} ຈົບສົກປີ ${year}`}</div>}
              />
            );
          }}
        />
        {getActionsButton("education")}
      </CardView>
    </Card>
  );
}
