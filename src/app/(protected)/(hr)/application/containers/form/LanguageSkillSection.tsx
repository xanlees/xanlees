import { Label } from "@src/shadcn/elements";
import type { IFormConfig } from "../../interface";
import { SectionInput, SkillOptions } from "./SectionInput";
export const LanguageSkillSection: React.FC<{ formConfig: IFormConfig }> = ({
  formConfig,
}) => {
  return (
    <>
      <Label>ທັກສະພາສາຕ່າງປະເທດ</Label>
      <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:w-1/2 sm:flex-row">
        <div className="space-y-2">
          <SectionInput formConfig={formConfig} options={SkillOptions} name="englishSkill" label="ພາສາອັງກິດ"/>
          <SectionInput formConfig={formConfig} options={SkillOptions} name="thaiSkill" label="ພາສາໄທ"/>
        </div>
        <div className="space-y-2">
          <SectionInput formConfig={formConfig} options={SkillOptions} name="chineseSkill" label="ພາສາຈີນ"/>
          <SectionInput formConfig={formConfig} options={SkillOptions} name="vietnameseSkill" label="ພາສາຫວຽດນາມ"/>
        </div>
      </div>
    </>
  );
};
