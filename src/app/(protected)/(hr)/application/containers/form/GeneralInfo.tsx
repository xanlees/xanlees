import { Label } from "@src/shadcn/elements";
import type { IFormConfig } from "../../interface";
import { Badge } from "lucide-react";
import { DrivingLicenceOptions, SectionInput, VaccinesOptions } from "./SectionInput";

export const GeneralInfo: React.FC<{
  formConfig: IFormConfig
}> = ({ formConfig }) => {
  return (
    <>
      <div className="flex gap-x-2">
        <Badge /> <Label className="text-xl font-bold">ຂໍ້ມູນທົ່ວໄປ</Label>
      </div>
      <div className="flex flex-col w-full capitalize rounded-lg sm:w-1/2 sm:flex-row gap-x-2">
        <div className="flex-1">
          <SectionInput formConfig={formConfig} options={DrivingLicenceOptions} name="typeDrivingLicense" label="ໃບຂັບຂີ່" />
        </div>
        <div className="flex-1">
          <SectionInput formConfig={formConfig} options={VaccinesOptions} name="typeVaccine" label="ທ່ານໄດ້ຮັບຢາວັກຊີນ" />
        </div>
      </div>
    </>
  );
};

