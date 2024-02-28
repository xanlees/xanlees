import { GraduationCap } from "lucide-react";
import React from "react";

interface EducationSectionProps {
  educationData?: {
    data?: Array<{
      sector?: string
      branch?: string
      graduationDetail?: { degree?: string, sector?: string }
    }>
  }
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  educationData,
}) => {
  return (
    <>
      <div className="my-4 text-2xl font-bold">ການສຶກສາ</div>
      {educationData?.data?.[0] === undefined ? "ຍັງບໍ່ທັນຕື່ມຂໍ້ມູນ" : ""}
      {educationData?.data?.map((education, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-wrap">
            <div className="px-2">
              <GraduationCap className="w-5 h-5 mt-0.5" />
            </div>
            <div className="font-bold">ລະດັບຈົບການສຶກສາວິຊາສະເພາະ:</div>
            <div className="px-2">{`${education?.graduationDetail?.degree} - ${education?.graduationDetail?.sector}`}</div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};
