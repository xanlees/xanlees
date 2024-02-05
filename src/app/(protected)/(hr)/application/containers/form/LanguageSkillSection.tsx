import { Label } from "@src/shadcn/elements";
import type { IFormConfig } from "../../interface";
import { SectionInput, SkillOptions } from "./SectionInput";
import { Badge } from "lucide-react";
export const LanguageSkillSection: React.FC<{ formConfig: IFormConfig }> = ({
  formConfig,
}) => {
  return (
    <div className="py-6 border-t border-gray-200 first:pt-0 last:pb-0 first:border-transparent dark:border-gray-700 dark:first:border-transparent">
      <label className="inline-block my-2 text-lg font-medium dark:text-white">
        ທັກສະພາສາຕ່າງປະເທດ
      </label>
      <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:w-1/2 sm:flex-row">
        <div className="space-y-2 mr-0 sm:mr-7 ">
          <SectionInput
            formConfig={formConfig}
            options={SkillOptions}
            name="englishSkill"
            label="ພາສາອັງກິດ"
          />
          <SectionInput
            formConfig={formConfig}
            options={SkillOptions}
            name="thaiSkill"
            label="ພາສາໄທ"
          />
        </div>
        <div className="space-y-2 mr-0 sm:mr-7">
          <SectionInput
            formConfig={formConfig}
            options={SkillOptions}
            name="chineseSkill"
            label="ພາສາຈີນ"
          />
          <SectionInput
            formConfig={formConfig}
            options={SkillOptions}
            name="vietnameseSkill"
            label="ພາສາຫວຽດນາມ"
          />
        </div>
      </div>
    </div>
  );
};
