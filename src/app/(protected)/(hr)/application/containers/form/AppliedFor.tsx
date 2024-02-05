import { Label } from "@src/shadcn/elements";
import type { IFormConfig } from "../../interface";
import { InputBase } from "@src/common/elements/input/InputBase";
import { Badge } from "lucide-react";

export const AppliedFor: React.FC<{
  formConfig: IFormConfig;
}> = ({ formConfig }) => {
  return (
    <>
      <div className="py-6 border-t border-gray-200 first:pt-0 last:pb-0 first:border-transparent dark:border-gray-700 dark:first:border-transparent">
        <label className="inline-block my-2 text-lg font-medium dark:text-white">
          ຕໍາແຫນ່ງທີ່ສະຫມັກ
        </label>
        <div className="mt-2 space-y-3">
          <InputBase
            {...formConfig}
            name="appliedPosition"
            label="ຕໍາແຫນ່ງທີ່ສະຫມັກ"
            placeholder="ຕໍາແຫນ່ງທີ່ສະຫມັກ"
            className="block w-full px-3 py-2 text-sm border-gray-200 shadow-sm pe-11 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          />
          <InputBase
            {...formConfig}
            name="expectedSalary"
            label="ເງິນເດືອນທີ່ຕ້ອງການ"
            placeholder="10,000,000 ກີບ"
            type="number"
            className="block w-full px-3 py-2 text-sm border-gray-200 shadow-sm pe-11 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          />
        </div>
      </div>
    </>
  );
};
