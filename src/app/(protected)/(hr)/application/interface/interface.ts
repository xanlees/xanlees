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
  profileDetail: IProfile
  postId: number
  postDetail: IPost
  emergencyFullname: string
  emergencyRelationship: string
  emergencyPhoneNumber: string
  typeDrivingLicence: "A" | "B" | "C" | "D" | "OTHER"
  typeVaccine: string[] | Array<{ typeVaccine: string }>
  wordSkill: "Poor" | "Fair" | "Good" | "Excellent"
  excelSkill: "Poor" | "Fair" | "Good" | "Excellent"
  powerpointSkill: "Poor" | "Fair" | "Good" | "Excellent"
  thaiSkill: "Poor" | "Fair" | "Good" | "Excellent"
  englishSkill: "Poor" | "Fair" | "Good" | "Excellent"
  chineseSkill: "Poor" | "Fair" | "Good" | "Excellent"
  vietnameseSkill: "Poor" | "Fair" | "Good" | "Excellent"
  pledgeReason: string
  appliedReason: string
  id?: number
  createdOn: string
  applicationStatus: "New" | "Contacted" | "Interviewed" | "Hired"
}

export interface IFormConfig {
  form: {
    setValue: any
  }
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
