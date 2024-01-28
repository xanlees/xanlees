import { Label } from "@src/shadcn/elements";
import type { IFormConfig } from "../../interface";
import { BaseInput } from "./BaseInput";
import { Badge } from "lucide-react";

export const EmergencyInformationSection: React.FC<{
  formConfig: IFormConfig
}> = ({ formConfig }) => {
  return (
    <>
      <div className="flex gap-x-2">
        <Badge /> <Label className="text-xl font-bold">ກໍລະນີສຸກເສີນຕິດຕໍ່ຫາ</Label>
      </div>
      <div className="flex flex-col w-full capitalize rounded-lg sm:w-1/2 sm:flex-row gap-x-2">
        <div className="flex-1">
          <BaseInput
            {...formConfig}
            name="emergencyFullname"
            label="ຊື່ ແລະ ນາມສະກຸນ"
          />
          <BaseInput
            {...formConfig}
            name="emergencyPhoneNumber"
            label="ເບີໂທ"
          />
        </div>
        <div className="flex-1">
          <BaseInput
            {...formConfig}
            name="emergencyRelationship"
            label="ຄວາມສໍາພັນ"
          />
        </div>
      </div>
    </>
  );
};
