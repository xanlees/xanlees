import { type IEmployee } from "@career";

export interface ProfileSendData {
  fullname: string
  nickname: string
  phoneNumber: string
  gender: "MALE" | "FEMALE" | "OTHER"
  birthday: string
  uniqueNumber: Array<{
    uniqueNumber: string
  }>
  profilePicture: FileList | null
  maritalStatus: "SINGLE" | "MARRIED"
}

export interface Profile {
  fullname: string
  nickname: string
  phoneNumber: string
  gender: "MALE" | "FEMALE" | "OTHER"
  birthday: string
  personalAddressId: number
  uniqueNumber: Array<{
    uniqueNumber: string
  }>
  profilePicture: FileList | null
  maritalStatus: "SINGLE" | "MARRIED"
}

export interface IProfile {
  personalAddressId: any
  id: number
  fullname: string
  nickname: string
  phoneNumber: string
  gender: "MALE" | "FEMALE" | "OTHER"
  birthday: string
  maritalStatus: "SINGLE" | "MARRIED"
  profilePicture: string | null
  uniqueNumber: string[]
  typeOfUniqueNumber: "IDENTIFY" | "CENSUS_BOOK" | "MACHINE"
  employee: IEmployee[]
}
export interface IGender {
  gender: "MALE" | "FEMALE" | "OTHER" | null
}
export type GenderType = "MALE" | "FEMALE" | "OTHER" | null;
export type MaritalStatusType =
  | "SINGLE"
  | "MARRIED"
  | null;

export interface IMaritalStatus {
  maritalStatus: MaritalStatusType
}
export interface IDistrict {
  id: number
  provinceName: string
  districtName: string
}
export interface IPersonalAddress {
  id: number
  village: string
  status: string
  houseNo: string
  profile: number
}

