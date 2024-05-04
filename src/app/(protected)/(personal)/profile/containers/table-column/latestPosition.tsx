"use client";
import { Table } from "@/shadcn/components/table";
import { Badge } from "@src/shadcn/elements";
import type { IPosition } from "@career";
import { type IProfile } from "../../interface/model";

export function getLatestPosition(positionId: number[], positionData: { data: IPosition[] }) {
  return <Table.Column
    header="ຕຳແໜ່ງ"
    id="employee"
    accessorKey="employee"
    cell={({ row }) => {
      const latestPositionId = positionId[row.index];
      const employee = (row.original as IProfile).employee;
      if (employee.length > 0) {
        const positionDetail = positionData?.data.find((item) => item?.id === latestPositionId);
        const displayText = (positionDetail !== undefined) ? `${positionDetail?.name}` : "ລໍຖ້າບັນຈູ";
        return (
          <div className="-mx-2">
            <Badge className="bg-gray-400">{displayText}</Badge>
          </div>
        );
      }
      return <></>;
    }} />;
}

export function getSector(positionId: number[], positionData: { data: IPosition[] }) {
  return <Table.Column
    header="ພະແນກ"
    id="employee"
    accessorKey="employee"
    cell={({ row }) => {
      const latestPositionId = positionId[row.index];
      const employee = (row.original as IProfile).employee;
      if (employee.length > 0) {
        const positionDetail = positionData?.data.find((item) => item?.id === latestPositionId);
        const displayText = (positionDetail !== undefined) ? `${positionDetail?.sectorId?.name}` : "ລໍຖ້າບັນຈູ";
        return (
          <div className="-mx-2">
            <Badge className="bg-gray-400">{displayText}</Badge>
          </div>
        );
      }
      return <></>;
    }} />;
}

export function getWorkingAge(positionId: number[], positionData: { data: IPosition[] }) {
  return (
    <Table.Column
      header="ອາຍຸການເຮັດວຽກ"
      id="employee"
      accessorKey="employee"
      cell={({ row }) => {
        const employee = (row.original as IProfile).employee;
        if (employee.length > 0) {
          const latestEmployee = employee.find((emp) => emp.isLatest && positionId.includes(emp.positionId));
          if (latestEmployee) {
            const { years, months } = calculateWorkingAge(latestEmployee.joiningDate);
            return (
              <div className="mx-2">
                <div>{years} ປີ {months} ເດືອນ</div>
              </div>
            );
          }
        }
        return <></>;
      }}
    />
  );
}

function calculateWorkingAge(joiningDate: string): { years: number, months: number } {
  const currentDate = new Date();
  const joiningDateObj = new Date(joiningDate);
  const yearsDiff = currentDate.getFullYear() - joiningDateObj.getFullYear();
  const monthsDiff = currentDate.getMonth() - joiningDateObj.getMonth();
  const monthsInYear = 12;
  const months = monthsDiff + (monthsDiff < 0 ? monthsInYear : 0);
  return { years: yearsDiff, months };
}
