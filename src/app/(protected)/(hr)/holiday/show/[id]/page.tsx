"use client";
import moment from "moment";
import { useShow } from "@refinedev/core";
import { Show } from "@/shadcn/components/crud";
import { type IHoliday } from "../../lib";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { getLabelByValue } from "../../container/column/holiday";
import { CardHeader, CardTitle } from "@src/shadcn/elements";

const holidaycrumbs = [
  { label: "ວັນພັກ", href: "/holiday" },
  { label: "ລາຍລະອຽດວັນພັກ" },
];

export default function HolidayShow({ params }: { params: { id: number } }): JSX.Element {
  const { queryResult } = useShow<IHoliday>();
  const { data } = queryResult;
  const record: IHoliday | undefined = data?.data;
  const type = record?.type;
  const date = record?.date;
  const { label } = getLabelByValue(type ?? "");

  return (
    <Show title="ລາຍລະອຽດວັນພັກ" breadcrumb={<BreadcrumbItems breadcrumbs={holidaycrumbs}/>}>
      <CardHeader className=" items-center pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 ">ຂໍ້ມູນລາຍລະອຽດວັນພັກ</CardTitle>
      </CardHeader>
      <div className=" mt-10 pb-3 bg-white rounded-lg shadow-xl justify-between w-full sm:w-[600px] dark:bg-gray-800 dark:text-white my-2 sm:my-0">
        <Show.Row title="ID" content={record?.id} />
        <Show.Row title="ວັນພັກ" content={record?.name} />
        <Show.Row title="ລາຍລະອຽດວັນພັກ" content={record?.decription} />
        {date && (
          <>
            <Show.Row title="ມື້ເລີ່ມ" content={moment(date[0]).format("DD MMM YYYY")} />
            <Show.Row title="ມື້ຈົບ" content={moment(date[1]).format("DD MMM YYYY")} />
          </>
        )}
        <Show.Row title="ປະເພດວັນພັກ" content={label} />
      </div>
    </Show>
  );
}
