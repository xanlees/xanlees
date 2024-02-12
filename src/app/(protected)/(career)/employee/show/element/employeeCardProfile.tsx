/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-irregular-whitespace */
import React from "react";
import moment from "moment";

import {
  getGenderDisplayText,
  getMaritalStatusDisplayText,
} from "../../lib/genderUtils";

export const EmployeeCard: React.FC<{ dataProfile?: any }> = ({ dataProfile }) => {
  return (
    <Container>
      <Profile dataProfile={dataProfile} />
      <hr className="my-6 border-t border-gray-300" />
      <PersonalInformation dataProfile={dataProfile} />
    </Container>
  );
};
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div className="p-6 border rounded-lg">{children}</div>
    </div>
  );
};

const Profile: React.FC<{ dataProfile?: any }> = ({ dataProfile }) => {
  const image = dataProfile?.data?.[0]?.profilePicture ?? "";
  const phoneNumber = dataProfile?.data?.[0]?.phoneNumber ?? "";
  return (
    <div className="flex flex-col items-center">
      <img
        src={image}
        className="object-cover w-32 h-32 mb-4 bg-gray-300 rounded-full shrink-0"
      />
      <div className="text-xl font-bold">
        {dataProfile?.data?.[0]?.fullname}
      </div>
      <p className="">{dataProfile?.data?.[0]?.positionDetail?.name}</p>
      <div className="flex flex-wrap justify-center w-1/2 gap-4 mt-6">
        {phoneNumber?.length > 0 && (
          <a
            href={`tel:${phoneNumber}`}
            className="px-8 py-2 text-white bg-black rounded dark:text-black dark:bg-white hover:bg-black"
          >
            Contact
          </a>
        )}
      </div>
    </div>
  );
};

const PersonalInformation: React.FC<{ dataProfile?: any }> = ({ dataProfile }) => {
  const birthday = dataProfile?.data?.[0]?.birthday ?? "";
  const age = calculateAge(birthday);
  return (
    <div className="flex flex-col">
      <span className="mb-2 font-bold tracking-wider uppercase">
        ຂໍ້​ມູນ​ສ່ວນ​ບຸກຄົນ
      </span>
      <ul className="capitalize">
        <li>{`ຊື່ ແລະ ນາມສະກູນ: ${dataProfile?.data?.[0]?.fullname}`}</li>
        <li>{`ຊື່ຫຼິ້ນ: ${dataProfile?.data?.[0]?.nickname}`}</li>
        <li>{`ເພດ: ${getGenderDisplayText(
          dataProfile?.data?.[0]?.gender ?? null,
        )}`}</li>
        <li>{`ສະຖານະພາບ: ${getMaritalStatusDisplayText(
          dataProfile?.data?.[0]?.maritalStatus ?? null,
        )}`}</li>
        <li>{`ວັນເດືອນປີເກີດ: ${moment(birthday).format("MMMM DD, YYYY")}`}</li>
        <li>{`ອາຍຸ: ${age}`}</li>
        <hr className="my-4 border-gray-200 border-t-1 dark:border-gray-700" />
        <span className="mb-2 font-bold tracking-wider uppercase">Contact</span>
        <li>{`ເບີໂທ: ${dataProfile?.data?.[0]?.phoneNumber}`}</li>
      </ul>
    </div>
  );
};

function calculateAge(birthday: string): string {
  const birthDate = moment(birthday);
  const today = moment();
  const years = today.diff(birthDate, "years");
  return `${years} years old`;
}
