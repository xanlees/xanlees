"use client";
import { CardView } from "@/shadcn/components/table/card-view";
import { type IWorkTimeSettings } from "../interface";

export function DayOfWeekRow({ workTimeSettingsData }: { workTimeSettingsData?: IWorkTimeSettings[] }) {
  return (
    <CardView.Row
      header=""
      id="id"
      accessorKey="id"
      cell={({ row: { original } }) => {
        const filteredData = workTimeSettingsData?.filter((item) => item.branch === original.id);
        return (
          <div className="-mx-[165px]">
            <div className="p-1.5 min-w-full inline-block align-middle ">
              <div className="px-6 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white  font-semibold">
              ມາຊ້າ ຫຼື ກັບກ່ອນເວລາໄດ້ {filteredData?.[0]?.lateTime ?? ""} ນາທີ
              </div>
              <div className="overflow-hidden">
                <table className="h-5 mb-2 text-center border-collapse rounded-md">
                  <Thead/>
                  <Tbody filteredData={filteredData}/>
                </table>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

function Tbody({ filteredData }: { filteredData?: IWorkTimeSettings[] }) {
  return (
    <tbody>
      {filteredData?.map((item, index) => (
        <tr key={index} className="odd:bg-gray-50 dark:odd:bg-gray-800">
          <td className="px-4 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {item.dayOfWeek}
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

