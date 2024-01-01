/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import moment from "moment";
import { type IEmployee } from "../interface/interface";
import {
  getGenderDisplayText,
  getMaritalStatusDisplayText,
} from "./genderUtils";

export const EmployeeCard: React.FC<{ record?: IEmployee }> = ({ record }) => {
  return (
    <Container>
      <Profile record={record} />
      <hr className="my-6 border-t border-gray-300" />
      <PersonalInformation record={record} />
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

const Profile: React.FC<{ record?: IEmployee }> = ({ record }) => {
  const image = record?.profileDetail.profilePicture ?? "";
  const phoneNumber = record?.profileDetail.phoneNumber ?? "";
  return (
    <div className="flex flex-col items-center">
      <img
        src={image}
        className="object-cover w-32 h-32 mb-4 bg-gray-300 rounded-full shrink-0"
      />
      <div className="text-xl font-bold">{record?.profileDetail.fullname}</div>
      <p className="">{record?.positionDetail.name}</p>
      <div className="flex flex-wrap justify-center w-1/2 mt-6 gap-4">
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

const PersonalInformation: React.FC<{ record?: IEmployee }> = ({ record }) => {
  const birthday = record?.profileDetail.birthday ?? "";
  const age = calculateAge(birthday);
  return (
    <div className="flex flex-col">
      <span className="mb-2 font-bold tracking-wider uppercase">
        Personal Information
      </span>
      <ul className="capitalize">
        <li>{`Fullname: ${record?.profileDetail.fullname}`}</li>
        <li>{`Nickname: ${record?.profileDetail.nickname}`}</li>
        <li>{`Gender: ${getGenderDisplayText(
          record?.profileDetail.gender ?? null,
        )}`}</li>
        <li>{`Marital Status: ${getMaritalStatusDisplayText(
          record?.profileDetail.maritalStatus ?? null,
        )}`}</li>
        <li>{`Birthday: ${moment(birthday).format("MMMM DD, YYYY")}`}</li>
        <li>{`Age: ${age}`}</li>
        <hr className="my-4 border-gray-200 border-t-1 dark:border-gray-700" />
        <span className="mb-2 font-bold tracking-wider uppercase">
          Contact
        </span>
        <li>{`Tel: ${record?.profileDetail.phoneNumber}`}</li>
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
