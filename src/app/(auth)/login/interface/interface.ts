import { type FieldValues } from "react-hook-form";

export type TSubmitFunc = (formData: ILoginVariables) => void;

export interface ILoginVariables extends FieldValues {
  username: string
  password: string
}
