import { Label } from "@src/shadcn/elements";
import type { IFormConfig } from "../../interface";
import { InputBase } from "@src/common/elements/input/InputBase";
import { Badge } from "lucide-react";

export const AppliedFor: React.FC<{
  formConfig: IFormConfig
}> = ({ formConfig }) => {
  return (
    <>
      <div className="flex gap-x-2">
        <Badge /> <Label className="text-xl font-bold">ຕໍາແຫນ່ງທີ່ສະຫມັກ</Label>
      </div>
      <div className="flex flex-col w-full capitalize rounded-lg sm:w-1/2 sm:flex-row gap-x-2">
        <div className="flex-1">
          <InputBase
            {...formConfig}
            name="positionAppliedFor"
            label="ຕໍາແຫນ່ງທີ່ສະຫມັກ"
            placeholder="ຕໍາແຫນ່ງທີ່ສະຫມັກ"
            className="w-64"
          />
        </div>
        <div className="flex-1">
          <div className="flex gap-x-2">
            <InputBase
              {...formConfig}
              name="expectedSalary"
              label="ເງິນເດືອນທີ່ຕ້ອງການ"
              placeholder="3,000,000"
              type="number"
              className="w-64"
            />
            <p className='pt-7'>ກິບ</p>
          </div>
        </div>
      </div>
    </>
  );
};
