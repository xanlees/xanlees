export interface IApplication {
  profileId: {
    id: number
  }
  province: {
    id: number
    provinceName: string
  }
  expectedSalary: string
  tagId: string
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

export interface IApplicationSchema {
  profileId: number
  emergencyFullname: string
  emergencyRelationship: string
  emergencyPhoneNumber: string
  applicationStatus: string
  appliedPosition: string
  expectedSalary: string
}
