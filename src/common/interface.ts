/* eslint-disable @typescript-eslint/naming-convention */
import { type Control, type FieldValues, type UseFormSetValue, type UseFormWatch } from "react-hook-form";
export interface IFormConfig {
  setValue?: UseFormSetValue<FieldValues>
  watch?: UseFormWatch<FieldValues>
  control?: Control<FieldValues>
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
