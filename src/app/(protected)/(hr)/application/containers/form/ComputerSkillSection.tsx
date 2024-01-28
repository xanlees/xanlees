import { Label } from "@src/shadcn/elements";
import { Badge } from "lucide-react";
import type { IFormConfig } from "../../interface";
import { SectionInput, SkillOptions } from "./SectionInput";
export const ComputerSkillSection: React.FC<{ formConfig: IFormConfig }> = ({
  formConfig,
}) => {
  return (
    <>
      <div className="flex gap-x-2">
        <Badge /> <Label className="text-xl font-bold">ຄວາມສາມາດໃນການໃຊ້ຄວາມພິວເຕີ</Label>
      </div>
      <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:w-1/2 sm:flex-row">
        <div className="space-y-2 ">
          <SectionInput
            formConfig={formConfig}
            name="wordSkill"
            label="Word Skill"
            options={SkillOptions}
          />
          <SectionInput
            formConfig={formConfig}
            name="excelSkill"
            label="Excel Skill"
            options={SkillOptions}

          />
        </div>
        <div className="">
          <SectionInput
            formConfig={formConfig}
            name="powerpointSkill"
            label="Powerpoint Skill"
            options={SkillOptions}

          />
        </div>
      </div>
    </>
  );
};
