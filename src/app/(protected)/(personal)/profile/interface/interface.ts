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
  id?: number
}
