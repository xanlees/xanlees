/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import type { IApplication } from "../../interface";
import { Card, CardContent, CardTitle } from "@src/shadcn/elements";
import moment from "moment";
import { getGenderDisplayText, getMaritalStatusDisplayText } from "@src/app/(protected)/(career)/employee/lib/genderUtils";

export const PersonalInformation: React.FC<{ record?: IApplication, physicalProfile: any }> = ({ record, physicalProfile }) => {
  const birthday = record?.profileId.birthday ?? "";
  const status = record?.profileId.maritalStatus ?? null;
  const age = calculateAge(birthday);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { nationality = "ລາວ", height = 0, weight = 0 } = physicalProfile?.data?.[0] ?? {};
  return (
    <Card className="flex flex-col p-2 my-2 rounded-sm ">
      <CardTitle className="text-xl text-center">{"ຂໍ້​ມູນ​ສ່ວນ​ບຸກຄົນ"}</CardTitle>
      <CardContent className="capitalize">
        <li>{`ຊື່ແທ້: ${record?.profileId.fullname}`}</li>
        <li>{`ຊື່ຫຼິ້ນ: ${record?.profileId.nickname}`}</li>
        <li>{`ເພດ: ${getGenderDisplayText(
          record?.profileId.gender ?? null,
        )}`}</li>
        <li>{`ສະຖານະພາບ: ${getMaritalStatusDisplayText(status)}`}</li>
        <li>{`ວັນເດືອນປີເກີດ: ${moment(birthday).format("MMMM DD, YYYY")}`}</li>
        <li>{`ອາຍຸ: ${age}`}</li>
        <li>{`ເບີໂທ: ${record?.profileId.phoneNumber}`}</li>
        <li>{`ຊັນຊາດ: ${nationality}`}</li>
        <li>{`ນໍ້າໜັກ: ${weight} Kg`}</li>
        <li>{`ລວງສູງ: ${height} Cm`}</li>
      </CardContent>
    </Card>
  );
};

function calculateAge(birthday: string): string {
  const birthDate = moment(birthday);
  const today = moment();
  const years = today.diff(birthDate, "years");
  return `${years} ປີ`;
}
