"use client";
import { Show } from "@/shadcn/components/crud";
import React from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import moment from "moment";
import { type IEmployee, type ISector } from "@career";
export function EmployeeDetail({ employeeData, sectorData }: { employeeData: IEmployee[], sectorData: ISector[] }): JSX.Element {
  const getSectorAndBranchDetail = getSector(sectorData);
  const sortedEmployeeData = sorted(employeeData);
  return (
    <Card className="w-full pb-3 bg-white rounded-lg shadow-xl dark:bg-gray-800 dark:text-white h-fit">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">ຂໍ້ມູນຕໍາແໜ່ງ</CardTitle>
      </CardHeader>
      <div className="px-4 py-2">
        {sortedEmployeeData.map((item) => {
          const sectorAndBranchDetail = getSectorAndBranchDetail(item.positionId.sectorId, item.joiningDate);
          return (
            <Show.Row
              key={item.id}
              className="text-gray-700 text-md dark:text-gray-300"
              title={item?.isLatest ? "ຕໍາແໜ່ງປະຈຸບັນ" : "ຕໍາແໜ່ງຜ່ານມາ"}
              content={`${item?.positionId?.name}, ${sectorAndBranchDetail}`}
            />
          );
        })}
      </div>
    </Card>
  );
}

function sorted(employeeData: IEmployee[]) {
  return [...employeeData].sort((a, b) => {
    if (a.isLatest && !b.isLatest) {
      return -1;
    }
    if (!a.isLatest && b.isLatest) {
      return 1;
    }
    return 0;
  });
}

function getSector(sectorData: ISector[]) {
  return (sectorId: number, joiningDate: string): string => {
    const sector = sectorData.find((s) => s.id === sectorId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (sector != null) ? `${sector.name}, ${(sector.branchId as any)?.name} ${moment(joiningDate).format("MMMM DD, YYYY")}` : "N/A";
  };
}

