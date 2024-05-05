"use client";

import { useProvinceSelect } from "@personal";
import { ComboboxSelect } from "@src/shadcn/elements/combobox-select";
interface SelectProvinceProps {
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>
}

export function SelectProvince({ setSelected }: SelectProvinceProps): JSX.Element {
  const handlePeriodChange = (id: number) => {
    setSelected(id);
  };
  const province = useProvinceSelect();
  return (
    <div className="flex p-4 bg-white rounded-lg shadow-md w-fit gap-x-5 ">
      <div>
        <div className="mb-2 text-lg font-semibold text-gray-700">ແຂວງ</div>
        <ComboboxSelect options={province.options} onChange={handlePeriodChange} label="" className="w-[300px]" defaultValue={""}/>
      </div>
    </div>
  );
}
