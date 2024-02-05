/* eslint-disable @typescript-eslint/naming-convention */
export interface IFormConfig {
  form: {
    setValue: any
  }
}

interface FormHeadersConfig {
  headers: {
    "content-type": string
  }
}

export const formHeadersConfig: FormHeadersConfig = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export interface IProfile {
  id: number
  fullname: string
  nickname: string
  phoneNumber: string
  gender: "MALE" | "FEMALE" | "OTHER"
  birthday: string
  personalAddressId: number
  maritalStatus: "SINGLE" | "MARRIED" | null
  profilePicture: string
  uniqueNumber: string[]
  typeOfUniqueNumber: "MACHINE" | "OTHER"
}

export type MaritalStatusType =
  | "SINGLE"
  | "MARRIED"
  | null;

export type GenderType = "MALE" | "FEMALE" | "OTHER" | null;

export interface ErrorMapMessage {
  val: string;
  message: string;
}
