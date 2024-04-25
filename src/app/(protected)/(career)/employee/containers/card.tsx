import React from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { getActionsButton } from "@src/common/containers/column/actionCard";
import { CardView } from "@src/shadcn/components/table/card-view";
import moment from "moment";
import { useTableEmployee } from "../hook/useTableEmployee";
import { type IEmployee } from "../interface";

export function EmployeeCard({ profileId }: { profileId: number }): JSX.Element {
  const { table } = useTableEmployee(profileId);
  return (
    <Card className="shadow-xl pb-3 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ຂໍ້ມູນຕໍາແໜ່ງ"}
        </CardTitle>
      </CardHeader>
      <CardView table={table} className="w-96" showSearchBar={false} showPagination={false}>
        <CardView.Row
          header=""
          id="id"
          accessorKey="id"
          cell={({ row }) => {
            const rowData = row.original as IEmployee;
            const isLatest = rowData.isLatest ? "ຕໍາແໜ່ງປະຈຸບັນ" : "ຕໍາແໜ່ງຜ່ານມາ";
            const positionName = rowData.positionId?.name ?? "Unknown Position";
            const sectorName = rowData.positionId?.sectorId?.name ?? "Unknown Sector";
            const branchName = rowData.branchId?.name ?? "Unknown Branch";
            const joiningDate = rowData.joiningDate ? moment(rowData.joiningDate).format("DD/MMMM/YYYY") : "Unknown Date";
            return (
              <>
                <label className="-mx-44 text-lg font-bold">{isLatest}</label>
                <div className="-mx-44 text-md">{`${positionName}, ${sectorName}, ${branchName}, ວັນທີຮັບຕໍາແໜ່ງ ${joiningDate}`}</div>
              </>
            );
          }}
        />
        {getActionsButton("employee")}
      </CardView>
    </Card>
  );
}
