/* eslint-disable max-lines */
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
export interface IPost {
  id: number
  fullname: string
  nickname: string
  phoneNumber: string
  gender: "MALE" | "FEMALE" | "OTHER"
  birthday: string
  personalAddressId: number
  maritalStatus: "SINGLE" | "MARRIED" | "OTHER"
  profilePicture: string
  uniqueNumber: string[]
  typeOfUniqueNumber: "MACHINE" | "OTHER"
}
export interface IApplication {
  profileId: number
  expectedSalary: string
  appliedPosition: string
  emergencyFullname: string
  emergencyRelationship: string
  emergencyPhoneNumber: string
  typeDrivingLicense: string
  typeVaccine: string
  pledgeReason: string
  appliedReason: string
  id: number
  createdOn: string
  applicationStatus: string
  applicantSignature: boolean
  vehicleType: string
}
export interface IWorkExperience {
  company: string
  position: string
  time: string
  salary: string
  reasonOfResignation: string
  applicationId: number
  id: number
}
export interface IEducation {
  year: string
  branch: string
  graduationDetail: {
    id: number
    degree: string
    sector: string
  }
  graduationId: number
  profileId: number
  id: number
}
export interface IDocument {
  documentName: string
  documentFile: string
  profileId: number
  id: number
}
export interface IPhysicalProfile {
  data?: {
    id: number
    profileId: number
    nationality: string
    height: number
    weight: number
  }
}

export interface CrudFilter {
  field: string
  operator: "eq" | "ne"
  value: string
}

export interface IDistrict {
  id: number
  provinceName: string
  districtName: string
}
export interface IPersonalAddress {
  id: number
  bornDistrictId: IDistrict
  currentDistrictId: IDistrict
  bornVillage: string
  currentVillage: string
}
