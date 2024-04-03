"use client";
import { Show } from "@/shadcn/components/crud";
import { Badge as ShadcnBadge } from "@src/shadcn/elements/badge";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage, Card, CardContent, CardHeader, CardTitle } from "@src/shadcn/elements";
import { getGenderDisplayText, getMaritalStatusDisplayText } from "../../../../../../common/lib/genderUtils";
import moment from "moment";
import { type IProfile } from "../../interface/model";
export function ProfileDetail({ profileData, visible }: { profileData: IProfile[], visible: string }): JSX.Element {
  const { fullname, nickname, phoneNumber, gender, birthday, maritalStatus, profilePicture } = profileData?.[0] ?? {};
  const age = calculateAge(birthday);
  return (
    <Card className="w-full pb-3 bg-white rounded-lg shadow-xl md:w-1/3 dark:bg-gray-800 dark:text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800">ຂໍ້ມູນສ່ວນບຸກຄົນ</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileImage imageUrl={profilePicture ?? ""}/>
      </CardContent>
      <div className="px-4 py-2">
        {visible === "agent"
          ? (
            <>
              <Show.Row className="text-md" title="ຊື່​ ແລະ ນາມ​ສະ​ກຸນ" content={`${fullname} ${nickname}`} />
              <Show.Row className="text-md" title="ເພດ" content={getGenderDisplayText(gender)} />
              <Show.Row className="text-md" title="ສະຖານະພາບ" content={getMaritalStatusDisplayText(maritalStatus)} />
              <Show.Row className="text-md" title="ອາຍຸ" content={age} />
              <Show.Row className="text-md" title="ວັນເດືອນປີເກີດ" content={moment(birthday).format("MMMM DD, YYYY")} />
              <Show.Row className="text-md" title="ເບີໂທ" content={phoneNumber} />
            </>)
          : (
            <>
              <Show.Row className="text-md" title="ຊື່​ ແລະ ນາມ​ສະ​ກຸນ" content={`${fullname} ${nickname}`} />
              <Show.Row className="text-md" title="ເພດ" content={getGenderDisplayText(gender)} />
              <Show.Row className="text-md" title="ເບີໂທ" content={phoneNumber} />
            </>)}
      </div>
    </Card>
  );
}

export function ProfileImage({ imageUrl }: { imageUrl: string }) {
  return (
    <Avatar className="w-32 h-32 mx-auto overflow-hidden border-4 border-white rounded-full shadow-sm md:w-48 md:h-48 xl:w-64 xl:h-64">
      <AvatarImage src={imageUrl} alt="profile image" className="object-cover object-center w-full h-full"/>
      <AvatarFallback className="flex items-center justify-center h-full">Profile Image</AvatarFallback>
    </Avatar>
  );
}

function calculateAge(birthday: string): string {
  const birthDate = moment(birthday);
  const today = moment();
  const years = today.diff(birthDate, "years");
  return `${years} ປີ`;
}

export const UniqueNumber: React.FC<{ uniqueNumber?: string[], typeOfUniqueNumber: string }> = ({
  uniqueNumber,
  typeOfUniqueNumber,
}) => {
  const codeType = getTypeDisplayText(typeOfUniqueNumber);
  return (
    <Show.Row
      className="text-md"
      title={codeType}
      content={
        <React.Fragment>
          {uniqueNumber?.map((item: string) => (
            <ShadcnBadge key={item}>
              {item}
            </ShadcnBadge>
          ))}
        </React.Fragment>
      }
    />
  );
};

const getTypeDisplayText = (type: string | undefined): string => {
  if (type === "IDENTIFY") {
    return "ເລກບັດປະຈໍາຕົວ";
  } else if (type === "CENSUS_BOOK") {
    return "ປື້ມສໍາມະໂມຄົວເລກທີ";
  } else if (type === "MACHINE") {
    return "ເລກເຄື່ອງຂາຍເລກ";
  }
  return "";
};
