"use client";

import { type IWorkTimeSettings } from "../../interface";
import { Table } from "@src/shadcn/components/table";

export function DayOfWeekRow() {
  return (
    <Table.Column
      header=""
      id="id"
      accessorKey="id"
      cell={({ row: { original } }) => {
        const workTimeSettings = original.workTimeSettings as IWorkTimeSettings[];
        return (
          <div className="-mx-[160px]">
            <div className="p-1.5 min-w-full inline-block align-middle ">
              <div className="">
              ມາຊ້າ ຫຼື ກັບກ່ອນເວລາໄດ້ {workTimeSettings?.[0]?.lateTime ?? ""} ນາທີ
              </div>
              <div className="overflow-hidden">
                <table className="h-5 mb-2 text-center border-collapse rounded-md">
                  <Thead/>
                  <Tbody filteredData={workTimeSettings}/>
                </table>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

function translateDay(day: string): string {
  switch (day) {
    case "Monday":
      return "ວັນຈັນ";
    case "Tuesday":
      return "ວັນອັງຄານ";
    case "Wednesday":
      return "ວັນພຸດ";
    case "Thursday":
      return "ວັນພະຫັດ";
    case "Friday":
      return "ວັນ​ສຸກ";
    case "Saturday":
      return "ວັນເສົາ";
    case "Sunday":
      return "ວັນອາທິດ";
    default:
      return day;
  }
}
function Tbody({ filteredData }: { filteredData?: IWorkTimeSettings[] }) {
  const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const sortedWorkTimeSettings = [...(filteredData ?? [])].sort((a, b) => {
    return daysOrder.indexOf(a.dayOfWeek) - daysOrder.indexOf(b.dayOfWeek);
  });
  return (
    <tbody>
      {sortedWorkTimeSettings?.map((item, index) => (
        <tr key={index} className="odd:bg-gray-50 dark:odd:bg-gray-800">
          <td className="px-4 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {translateDay(item.dayOfWeek)}
          </td>
          <td className="px-4 py-4">
            {item.checkInTime}
          </td>
          <td className="px-4 py-4">
            {item.checkOutTime}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function Thead() {
  return (
    <thead className="bg-gray-100 dark:bg-gray-700">
      <tr>
        <th scope="col" className="px-4 py-2 ">
            ມື້
        </th>
        <th scope="col" className="px-4 py-2">
            ເວລາເຂົ້າວຽກ
        </th>
        <th scope="col" className="px-4 py-2">
            ເວລາເຂົ້າວຽກ
        </th>
      </tr>
    </thead>
  );
}
