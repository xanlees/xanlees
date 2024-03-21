export interface IEmployee {
  positionId: IPosition
  joiningDate: string
  isLatest: boolean
  id: number
  profileId: IProfile
}

export interface IPosition {
  id: number
  sectorId: number
  name: string
}

export interface IProfile {
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
  employee: Employee[]
}

interface Employee {
  id: number
  positionId: number
  joiningDate: string
  isLatest: boolean
  updatedOn: string
  createdOn: string
}

export interface IEducation {
  id: number
  profileId: number
  graduationId: IGraduation
  branch: string
  sector: string
  year: string
}

interface IGraduation {
  id: number
  degree: string
  sector: string
}

export interface ISector {
  id: number
  name: string
  branchId: {
    id: number
    name: string
  }
}

export interface IDocument {
  documentName: string
  documentFile: string
  profileId: number
  id: number
}

export interface IPersonalAddress {
  id: number
  village: string
  status: string
  houseNo: string
  profile: number
  district: {
    id: number
    provinceName: string
    districtName: string
  }
}
