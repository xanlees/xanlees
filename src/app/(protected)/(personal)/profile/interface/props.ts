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

export interface IErrorMessageNotification {
  val: string
  message: string
}
