import { Label } from "@src/shadcn/elements";
import type { IFormConfig } from "../../interface";
import { Badge } from "lucide-react";
import {
  DrivingLicenceOptions,
  SectionInput,
  VaccinesOptions,
} from "./SectionInput";

export const GeneralInfo: React.FC<{
  formConfig: IFormConfig;
}> = ({ formConfig }) => {
  return (
    <>
      <div className="py-6 border-t border-gray-200 first:pt-0 last:pb-0 first:border-transparent dark:border-gray-700 dark:first:border-transparent">
        <label className="inline-block my-2 text-lg font-medium dark:text-white">
          ຂໍ້ມູນທົ່ວໄປ{" "}
        </label>
        <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:w-1/2 sm:flex-row">
          <div className="space-y-2 mr-0 sm:mr-7 ">
            <SectionInput
              formConfig={formConfig}
              options={DrivingLicenceOptions}
              name="typeDrivingLicense"
              label="ໃບຂັບຂີ່"
            />
          </div>
          <div className="space-y-2 mr-0 sm:mr-7">
            <SectionInput
              formConfig={formConfig}
              options={VaccinesOptions}
              name="typeVaccine"
              label="ທ່ານໄດ້ຮັບຢາວັກຊີນ"
            />
          </div>
        </div>
      </div>
    </>
  );
};
