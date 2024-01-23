"use client";
import type { IApplication } from "../../interface";
import { Card, CardContent, CardTitle } from "@src/shadcn/elements";
import moment from "moment";
import { getGenderDisplayText, getMaritalStatusDisplayText } from "@src/app/(protected)/(career)/employee/lib/genderUtils";
export const PersonalInformation: React.FC<{ record?: IApplication }> = ({ record }) => {
  const birthday = record?.profileDetail.birthday ?? "";
  const status = record?.profileDetail.maritalStatus ?? null;
  const age = calculateAge(birthday);
  return (
    <Card className="flex flex-col p-2 my-2 rounded-sm">
      <CardTitle className="text-xl text-center">{"ຂໍ້​ມູນ​ສ່ວນ​ບຸກຄົນ"}</CardTitle>
      <CardContent className="capitalize">
        <li>{`ຊື່ ແລະ ນາມສະກູນ: ${record?.profileDetail.fullname}`}</li>
        <li>{`ຊື່ຫຼິ້ນ: ${record?.profileDetail.nickname}`}</li>
        <li>{`ເພດ: ${getGenderDisplayText(
          record?.profileDetail.gender ?? null,
        )}`}</li>
        <li>{`ສະຖານະພາບ: ${getMaritalStatusDisplayText(status)}`}</li>
        <li>{`ວັນເດືອນປີເກີດ: ${moment(birthday).format("MMMM DD, YYYY")}`}</li>
        <li>{`ອາຍຸ: ${age}`}</li>
        <li>{`ເບີໂທ: ${record?.profileDetail.phoneNumber}`}</li>
      </CardContent>
    </Card>
  );
};

function calculateAge(birthday: string): string {
  const birthDate = moment(birthday);
  const today = moment();
  const years = today.diff(birthDate, "years");
  return `${years} years old`;
}
