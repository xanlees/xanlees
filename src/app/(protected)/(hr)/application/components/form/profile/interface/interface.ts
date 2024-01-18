export interface ProfileSendData {
  fullname: string
  nickname: string
  phoneNumber: string
  gender: "MALE" | "FEMALE" | "OTHER"
  birthday: string
  personalAddressId: number
  uniqueNumber: string
  profilePicture: FileList
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
  fullname: string
  nickname: string
  phoneNumber: string
  gender: string
  maritalStatus: string
  id?: number
}
