import { CalendarDays } from "lucide-react";
import moment from "moment";
import React from "react";

interface JoiningDateSectionProps {
  joiningDate?: string
}
export const JoiningDateSection: React.FC<JoiningDateSectionProps> = ({
  joiningDate,
}) => {
  const formattedDate =
    joiningDate !== undefined
      ? moment(joiningDate).format("MMMM DD, YYYY")
      : "";
  return (
    <>
      <div className="my-4 text-2xl font-bold">ວັນທີ ເດືອນປີ ເຂົ້າວຽກກັບ</div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <CalendarDays className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">ວັນທີ ເດືອນປີ ເຂົ້າວຽກກັບ ບໍລິສັດ:</div>
        <div className="px-2">
          <div>{formattedDate}</div>
        </div>
      </div>
    </>
  );
};
