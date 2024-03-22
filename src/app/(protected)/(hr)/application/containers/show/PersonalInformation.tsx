/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import type { IProfile } from "../../interface";
import { Card, CardContent, CardTitle } from "@src/shadcn/elements";
import moment from "moment";
import { getGenderDisplayText, getMaritalStatusDisplayText } from "@src/common/lib/genderUtils";

export const PersonalInformation: React.FC<{ data?: IProfile, physicalProfile: any, record: any, personalAddressData: any }> = ({ data, physicalProfile, record, personalAddressData }) => {
  const birthday = data?.birthday ?? "";
  const status = data?.maritalStatus ?? null;
  const age = calculateAge(birthday);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { nationality = "ລາວ", height = 0, weight = 0 } = physicalProfile?.data?.[0] ?? {};
  return (
    <Card className="flex flex-col p-2 my-2 rounded-sm ">
      <CardTitle className="text-xl text-center">{"ຂໍ້​ມູນ​ສ່ວນ​ບຸກຄົນ"}</CardTitle>
      <CardContent className="capitalize">
        <li>{`ຊື່ແທ້: ${data?.fullname}`}</li>
        <li>{`ຊື່ຫຼິ້ນ: ${data?.nickname}`}</li>
        <li>{`ເພດ: ${getGenderDisplayText(
          data?.gender ?? null,
        )}`}</li>
        <li>{`ສະຖານະພາບ: ${getMaritalStatusDisplayText(status)}`}</li>
        <li>{`ວັນເດືອນປີເກີດ: ${moment(birthday).format("MMMM DD, YYYY")}`}</li>
        <li>{`ອາຍຸ: ${age}`}</li>
        <li>{`ຊັນຊາດ: ${nationality}`}</li>
        <li>{`ນໍ້າໜັກ: ${weight} Kg`}</li>
        <li>{`ລວງສູງ: ${height} Cm`}</li>
      </CardContent>
      <CardTitle className="text-xl text-center">{"ຂໍ້​ມູນ​ທົ່ວໄປ"}</CardTitle>
      <CardContent className="capitalize">
        <li>{`ເບີໂທ: ${data?.phoneNumber}`}</li>
        <li>{`ມີໃບຂັບຂີ່ປະເພດ: ${record?.typeDrivingLicense}`}</li>
        <li>{`ໄດ້ຮັບຢາວັກຊີນ: ${record?.typeVaccine}`}</li>
        <li>{`ເຮືອນເລກທີ: ${personalAddressData?.houseNo}`}</li>
        {data?.uniqueNumber?.map((uniqueNumber, index) => (
          <li key={index} className="text-sm">{`ບັດປະຈາຕົວ/ປື້ມສໍາມະໂມຄົວ ເລກທີ : ${uniqueNumber}`}</li>
        ))}
      </CardContent>
      <CardTitle className="text-xl text-center">{"ກໍລະນີສຸກເສີນຕິດຕໍ່ຫາ"}</CardTitle>
      <CardContent className="capitalize">
        <li>{`ຊື່: ${record?.emergencyFullname}`}</li>
        <li>{`ຄວາມສາພັນ: ${record?.emergencyRelationship}`}</li>
        <li>{`ເບີໂທ : ${record?.emergencyPhoneNumber}`}</li>
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
