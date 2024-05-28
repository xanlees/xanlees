/* eslint-disable @typescript-eslint/naming-convention */
import { type Control, type FieldValues, type UseFormSetValue, type UseFormWatch, type useFieldArray } from "react-hook-form";

export interface IFormConfig {
  setValue?: UseFormSetValue<FieldValues>
  watch?: UseFormWatch<FieldValues>
  control?: Control<FieldValues>
  form: {
    setValue?: UseFormSetValue<FieldValues>
    watch?: UseFormWatch<FieldValues>
    control?: Control<FieldValues>
  }
}

export interface IFormProp {
  form: IFormConfig
}

export interface ExtendedFieldArrayProps extends IFormProp {
  fields: ReturnType<typeof useFieldArray>["fields"]
  append: ReturnType<typeof useFieldArray>["append"]
  remove: ReturnType<typeof useFieldArray>["remove"]
}

export interface ITable {
  options: {
    data: any
  }
}
interface FormHeadersConfigMultipart {
  headers: {
    "content-type": string
  }
}

export const FormMultipart: FormHeadersConfigMultipart = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

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

export type MaritalStatusType =
  | "SINGLE"
  | "MARRIED"
  | null;

export type GenderType = "MALE" | "FEMALE" | "OTHER" | null;

export interface ErrorMapMessage {
  val: string
  message: string
}

export interface IMessages {
  response: {
    data: Record<string, any>
  }
}
export interface ExtendedCrudFilter {
  field: string
  operator: "eq"
  value: string | number | boolean
}

interface IUseSession {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export interface CustomSession {
  user?: IUseSession
}
