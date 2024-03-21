/* eslint-disable max-lines */
export interface ProfileSendData {
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

export interface IFormConfig {
  form: {
    setValue: any
    control: any
    watch: any
  }
}

export interface ProfileFormValues {
  id?: number
}

export interface IErrorMessageNotification {
  val: string
  message: string
}
export interface IEmployee {
  positionId: {
    id: number
    sectorId: number
    name: string
  }
  joiningDate: string
  isLatest: boolean
  id: number
  profileId: IProfile
}
export interface IProfile {
  id: number
  fullname: string
  nickname: string
  phoneNumber: string
  gender: "MALE" | "FEMALE" | "OTHER"
  birthday: string
  personalAddressId: {
    bornDistrictId: number
    currentDistrictId: number
    bornVillage: string
    currentVillage: string
    id: number
  }
  maritalStatus: "SINGLE" | "MARRIED"
  profilePicture: string | null
  uniqueNumber: string[]
  typeOfUniqueNumber: "IDENTIFY" | "CENSUS_BOOK" | "MACHINE"
  employee: Employee[]
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

interface IGraduation {
  id: number
  degree: string
  sector: string
}
export interface IEducation {
  id: number
  profileId: number
  graduationId: IGraduation
  branch: string
  sector: string
  year: string
}
export interface ISector {
  id: number
  name: string
  branchId: {
    id: number
    name: string
  }
}
interface Employee {
  id: number
  positionId: number
  joiningDate: string
  isLatest: boolean
  updatedOn: string
  createdOn: string
}
export interface IPosition {
  name: string
  id: number
  sectorId: number
  sectorDetail: {
    name: string
    id: number
    branchId: number
  }
}
