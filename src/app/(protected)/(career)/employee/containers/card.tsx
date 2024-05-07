import React, { type ReactNode } from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { getActionsButton } from "@src/common/containers/column/actionCard";
import { CardView } from "@src/shadcn/components/table/card-view";
import moment from "moment";
import { useTableEmployee } from "../hook/useTableEmployee";
import { type IEmployeeExpand } from "../interface";
import { Show } from "@src/shadcn/components/crud";
import { ButtonCreate } from "@src/common/elements/button";

export function EmployeeCard({ profileId, redirect, title, disabled }: { profileId: number, redirect: string, title: string, disabled?: boolean }): JSX.Element {
  const enableEdit = disabled ? "" : "employee";
  const { table } = useTableEmployee(profileId);
  return (
    <CardLayout profileId={profileId} redirect={redirect} title={title} disabled={disabled}>
      <CardView table={table} className="w-80 m-2" showSearchBar={false} showPagination={false} >
        <CardView.Row
          header=""
          id="id"
          accessorKey="id"
          cell={({ row }) => {
            const rowData = row.original as IEmployeeExpand;
            return <PositionDetails rowData={rowData} title={title}/>;
          }}
        />
        {getActionsButton(enableEdit)}
      </CardView>
    </CardLayout>
  );
}

function CardLayout({ children, profileId, redirect, title, disabled }: { children: ReactNode, profileId?: number, redirect: string, title: string, disabled?: boolean }): JSX.Element {
  return (
    <Card className="shadow-xl pb-3 rounded-lg w-full sm:w-80 bg-white dark:bg-gray-800 dark:text-white h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          ຂໍ້ມູນ{title}
        </CardTitle>
        {disabled ? "" : (<ButtonCreate redirect={redirect} />)}

      </CardHeader>
      {children}
    </Card>
  );
}

const PositionDetails = ({ rowData, title }: { rowData: IEmployeeExpand, title: string }) => {
  const isLatest = rowData.isLatest ? `${title}ປະຈຸບັນ` : `${title}ຜ່ານມາ`;
  const positionName = rowData.positionId?.name ?? "";
  const sectorName = rowData.positionId?.sectorId?.name ?? "";
  const branchName = rowData.branchId?.name ?? "";
  const salary = rowData?.salary?.toLocaleString() ?? "";
  const joiningDate = rowData.joiningDate ? moment(rowData.joiningDate).format("DD/MMMM/YYYY") : "";
  return (
    <div className="w-80 -mx-40">
      <Show.Row
        title={isLatest}
        content={<div className="text-md">
          <div>
            {title}: {`${positionName}, ${sectorName}, ${branchName}`}
          </div>
          <div>
            ເງິນເດືອນ: {`${salary}`}
          </div>
          <div>
            ວັນທີຮັບ{title}: {joiningDate}
          </div>
        </div>}
      />
    </div>
  );
};
