export interface IEmployee {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
  birthOfDate: string
  villageCurrent: string
  gender: "MALE" | "FEMALE" | "OTHER"
  maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED"
  graduateEducationId: number
  academicYear: string
  startWorkDate: string
  villageBorn: string
  positionId: number
  birthAddress: number
  currentAddress: number
}
export interface IAddress {
  id: number
  provinceName: string
  districtName: string
}
