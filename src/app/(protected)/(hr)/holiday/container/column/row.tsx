import moment from "moment";

import { Table } from "@/shadcn/components/table";
import { type IHolidayExpand } from "../../lib";

interface HolidayRowProps {
  row: {
    original: IHolidayExpand
  }
}

export function DateRow({ date, header }: { date: number, header: string }) {
  return (
    <Table.Column
      header={header}
      id="date"
      accessorKey="date"
      cell={({ row }: HolidayRowProps) => {
        const holidayDate = row.original?.date?.[date];
        const holidayType = row.original?.type;
        if (holidayDate) {
          const formatString = holidayType === "Annual" ? "DD MMM" : "DD MMM YYYY";
          return moment(holidayDate).format(formatString);
        }
        return "";
      }}
    />
  );
}

const options = [
  { value: "Annual", label: "ພັກທຸກສາຂາ" },
  { value: "Year-Specific", label: "ສະເພາະປີ" },
  { value: "One-Time", label: "ໃຊ້ຄັ້ງດຽວ" },
];

export function getLabelByValue(value: string) {
  const option = options.find((opt) => opt.value === value);
  return option ? { label: option.label } : { label: value };
}

export function Type() {
  return (
    <Table.Column
      header="ປະເພດ"
      id="type"
      accessorKey="type"
      cell={({ row }: HolidayRowProps) => {
        const type = row.original?.type ?? "";
        const { label } = getLabelByValue(type);
        return (
          <div> {label} </div>
        );
      }}
    />
  );
}
export function BranchHolidayColumn({ holiday }: any) {
  return (
    <Table.Column
      header="ສາຂາ"
      id="id" accessorKey="id"
      cell={(props) => {
        const holidayId = props.getValue() as unknown as number;
        const branches = holiday?.filter((item: { holiday: number }) => item.holiday === holidayId);
        return (
          <>
            {branches.map((item: any, index: number) => {
              return (
                <div key={index}>
                  {item?.branch.name}
                </div>
              );
            })}
          </>
        );
      }}
    />
  );
}
