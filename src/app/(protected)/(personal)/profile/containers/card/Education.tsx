"use client";
import React, { type ReactNode } from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { getActionsButton } from "@src/common/containers/column/actionCard";
import { CardView } from "@src/shadcn/components/table/card-view";
import { Show } from "@src/shadcn/components/crud";
import { useTable } from "@refinedev/react-table";
import { type IEducation } from "../../../index";

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
  const { table } = useCardEducation(profileId);
  const educationData = table.options.data ?? [];
  if (educationData.length === 0) {
    return <CardLayout ><div>ບໍ່ມີຂໍ້ມູນ</div></CardLayout>;
  }
  return (
    <CardLayout>
      <CardView table={table} className="w-96 m-2" showSearchBar={false} showPagination={false}>
        <CardView.Row
          header=""
          id="id"
          accessorKey="id"
          cell={({ row }) => {
            const rowData = row.original as IEducationRow;
            const graduation = rowData.graduationId ?? {};
            const degree = graduation.degree ?? "";
            const sector = graduation.sector ?? "";
            const year = rowData.year ?? "";
            const branch = rowData.branch ?? "";
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
    </CardLayout>

  );
}

function CardLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Card className="shadow-xl pb-3 rounded-lg bg-white dark:bg-gray-800 dark:text-white h-fit w-96 ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ຂໍ້ມູນການສຶກສາ"}
        </CardTitle>
      </CardHeader>
      {children}
    </Card>

  );
}

const useCardEducation = (profileId: number) => {
  const table = useTable<IEducation>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "education",
      filters: {
        permanent: [
          { field: "profile_id", operator: "eq", value: profileId },
        ],
        initial: [
          { field: "expand", operator: "eq", value: "graduation_id" },
        ],
      },
    },
  });
  return { table };
};

