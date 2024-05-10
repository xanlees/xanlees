import { type IProfile } from "@personal";

export interface IApplication {
  id: number
  tagId: string
  profileId: IProfile
  province: {
    id: number
    provinceName: string
    districtName: string
  }
  appliedPosition: string
  expectedSalary: string
  emergencyFullname: string
  emergencyRelationship: string
  emergencyPhoneNumber: string
  typeDrivingLicense: string
  applicationStatus: string
  pledgeReason: string
  appliedReason: string
  applicantSignature: boolean
  createdOn: string
  vehicleType: string
}

export interface IApplicationSchema {
  profileId: number
  emergencyFullname: string
  emergencyRelationship: string
  emergencyPhoneNumber: string
  applicationStatus: string
  appliedPosition: string
  expectedSalary: string
}
