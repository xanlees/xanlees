export interface IEmployee {
  positionId: number
  positionDetail: {
    id: number
    sectorId: number
    name: string
  }
  joiningDate: string
  isLatest: string
  profileId: number
  id: number
  profileDetail: IProfile
}
export interface IProfile {
  id: number
  fullname: string
  nickname: string
  phoneNumber: string
  gender: "MALE" | "FEMALE" | "OTHER"
  birthday: string
  personalAddressId: number
  personalAddressDetail: {
    bornDistrictId: number
    currentDistrictId: number
    bornVillage: string
    currentVillage: string
    id: number
  }
  maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED"
  profilePicture: string | null
}
export interface IGender {
  gender: "MALE" | "FEMALE" | "OTHER" | null
}
export type GenderType = "MALE" | "FEMALE" | "OTHER" | null;

export type MaritalStatusType =
  | "SINGLE"
  | "MARRIED"
  | "DIVORCED"
  | "WIDOWED"
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
  currentDistrictDetail: IDistrict
  bornDistrictDetail: IDistrict
  bornDistrictId: number
  currentDistrictId: number
  bornVillage: string
  currentVillage: string
}
interface IGraduation {
  id: number
  degree: string
  sector: string
}

export interface IEducation {
  id: number
  profileId: number
  graduationId: number
  graduationDetail: IGraduation
  branch: string
  sector: string
  year: string
}

export interface ISector {
  id: number
  name: string
  branchId: number
  branchDetail: {
    id: number
    name: string
  }
}
