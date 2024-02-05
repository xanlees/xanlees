import type { IFormConfig } from "../../interface";
import { InputBase } from "@src/common/elements/input/InputBase";

export const EmergencyInformationSection: React.FC<{
  formConfig: IFormConfig;
}> = ({ formConfig }) => {
  return (
    <>
      <div className="py-6 border-t border-gray-200 first:pt-0 last:pb-0 first:border-transparent dark:border-gray-700 dark:first:border-transparent">
        <label className="inline-block my-2 text-lg font-medium dark:text-white">
          ກໍລະນີສຸກເສີນຕິດຕໍ່ຫາ
        </label>
        <div className="mt-2 space-y-3">
          <InputBase
            {...formConfig}
            name="emergencyFullname"
            label="ຊື່ ແລະ ນາມສະກຸນ"
            placeholder="ຊື່ ແລະ ນາມສະກຸນ"
            className="block w-full px-3 py-2 text-sm border-gray-200 shadow-sm pe-11 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          />
          <div className="grid gap-3 sm:flex">
            <InputBase
              {...formConfig}
              name="emergencyPhoneNumber"
              label="ເບີໂທ"
              placeholder="20xxxxxxxx"
              className="w-64 mr-4"
            />
            <InputBase
              {...formConfig}
              name="emergencyRelationship"
              label="ຄວາມສໍາພັນ"
              className="w-64"
            />
          </div>
        </div>
      </div>
    </>
  );
};
