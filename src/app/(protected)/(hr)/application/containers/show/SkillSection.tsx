"use client";

import { CircleDashed } from "lucide-react";
import type { IApplication } from "../../interface";

interface SkillItem {
  title?: string | number | undefined
  item?: string | number | undefined
}
interface SkillSectionProps {
  header?: string
  skills?: SkillItem[]
}

export function SkillSection({ header, skills }: SkillSectionProps): JSX.Element {
  return (
    <div className="flex flex-wrap">
      <div className="flex w-full h-12 my-auto mb-4 text-xl font-bold text-center sm:w-1/4">
        {header}
      </div>
      <div className="flex flex-wrap w-full sm:flex sm:w-1/2 ">
        {skills?.map((item, index) => (
          <div key={index} className="flex w-1/2 sm:w-1/2 gap-x-2">
            <CircleDashed className="w-5 h-5 mt-0.5" />
            <div className="">{item.title}: {item.item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const generateTechnicalSkills = (record?: IApplication): Array<{ title?: string | number | undefined, item?: string | number | undefined }> => {
  return [
    { title: "Word", item: mapSkill(record?.wordSkill ?? "Poor") },
    { title: "Excel", item: mapSkill(record?.excelSkill ?? "Poor") },
    { title: "PowerPoint", item: mapSkill(record?.powerpointSkill ?? "Poor") },
  ];
};

export const generateLanguageSkills = (record?: IApplication): Array<{ title?: string | number | undefined, item?: string | number | undefined }> => {
  return [
    { title: "ພາສາອັງກິດ", item: mapSkill(record?.englishSkill ?? "Poor") },
    { title: "ພາສາຈີນ", item: mapSkill(record?.chineseSkill ?? "Poor") },
    { title: "ພາສາຫວຽດນາມ", item: mapSkill(record?.vietnameseSkill ?? "Poor") },
    { title: "ພາສາໄທ", item: mapSkill(record?.thaiSkill ?? "Poor") },
  ];
};

const mapSkill = (skill: "Poor" | "Fair" | "Good" | "Excellent") => {
  switch (skill) {
    case "Poor":
      return "ໜ້ອຍ";
    case "Fair":
      return "ພໍໃຊ້";
    case "Good":
      return "ປານກາງ";
    case "Excellent":
      return "ດີ";
    default:
      return "";
  }
};
