/* eslint-disable max-lines */
"use client";
import { Show } from "@/shadcn/components/crud";
import { Badge as ShadcnBadge } from "@src/shadcn/elements/badge";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage, Card, CardContent, CardHeader, CardTitle } from "@src/shadcn/elements";
import { getGenderDisplayText, getMaritalStatusDisplayText } from "../../../../../../common/lib/genderUtils";
import moment from "moment";
import { type IProfile } from "../../interface/model";
import { ProfileImageDialog } from "./ProfileImageDialog";
import { ButtonCreate } from "@src/common/elements/button";
import { Table } from "@src/shadcn/components/table";
import { Edit, Trash2 } from "lucide-react";
export function ProfileDetail({ profileData, visible = false, user, disabled, userProfile }: { userProfile: number, profileData: IProfile[], visible?: boolean, user?: number, disabled: boolean }): JSX.Element {
  const { fullname, nickname, phoneNumber, gender, birthday, maritalStatus, profilePicture, uniqueNumber, typeOfUniqueNumber, id } = profileData?.[0] ?? {};
  const age = calculateAge(birthday);
  const redirect = `/profile/create/${user}/${userProfile}`;

  const edit = visible ? `/agent/edit/${id}` : `/profile/edit/${id}`;
  return (
    <Card className="pb-3 bg-white rounded-lg shadow-xl  w-full sm:w-80 dark:bg-gray-800 dark:text-white my-2 sm:my-0">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-100">ຂໍ້ມູນສ່ວນບຸກຄົນ</CardTitle>
          <div className="flex justify-end space-x-2 content-end items-end ml-28">
            <ButtonCreate redirect={redirect} disabled={disabled} />
            <ButtonCreate redirect={edit} title="ແກ້ໄຂ" icon={<Edit size="20"/>}/>
          </div>
        </div>
      </CardHeader>
      <CardContent className=" justify-center mx-auto">
        <ProfileImage imageUrl={profilePicture ?? ""}/>
      </CardContent>
      <ProfileImageDialog imageUrl={profilePicture ?? ""} fullname={fullname ?? ""} nickname={nickname ?? ""}/>
      <div className="px-4 py-2 ">
        {visible
          ? (
            <><Show.Row className="text-md" title="ຊື່​ ແລະ ນາມ​ສະ​ກຸນ" content={`${fullname} (${nickname})`} /><Show.Row className="text-md" title="ເພດ" content={getGenderDisplayText(gender)} /><Show.Row className="text-md" title="ເບີໂທ" content={phoneNumber} /></>)
          : (
            <><Show.Row className="text-md" title="ຊື່​ ແລະ ນາມ​ສະ​ກຸນ" content={`${fullname}  (${nickname || "ບໍ່ມີຂໍ້ມູນ"})`} /><Show.Row className="text-md" title="ເພດ" content={getGenderDisplayText(gender)} /><Show.Row className="text-md" title="ສະຖານະພາບ" content={getMaritalStatusDisplayText(maritalStatus)} /><Show.Row className="text-md" title="ອາຍຸ" content={age} /><Show.Row className="text-md" title="ວັນເດືອນປີເກີດ" content={moment(birthday).format("DD/MMMM/YYYY")} /><Show.Row className="text-md" title="ເບີໂທ" content={phoneNumber} /><UniqueNumber uniqueNumber={uniqueNumber} typeOfUniqueNumber={typeOfUniqueNumber} /></>)
        }
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

interface Props {
  row: unknown
  resource: string
}

export const ProfileAction = ({ row, resource }: Props): JSX.Element => {
  return (
    <>
      <Table.Actions>
        <Table.DeleteAction
          title="Delete"
          row={row}
          withForceDelete={true}
          resource={resource}
          icon={<Trash2 size={16} />}
        />
        <Table.EditAction
          title="Edit"
          row={row}
          resource={resource}
          icon={<Edit size={16} />}
        />
      </Table.Actions>
    </>
  );
};

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
