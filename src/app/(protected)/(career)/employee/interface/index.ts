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
  employee: Employee
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

interface Employee {
  [x: string]: any
  id: number;
  positionId: number;
  joiningDate: string;
  isLatest: boolean;
  updatedOn: string;
  createdOn: string;
}

export interface IPosition {
  name: string;
  id: number;
  sectorId: number;
  sectorDetail: {
    name: string;
    id: number;
    branchId: number;
  };
}
