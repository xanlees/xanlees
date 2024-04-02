import { type useFieldArray, type Control, type FieldValues, type UseFormSetValue, type UseFormWatch } from "react-hook-form";

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
export interface CommonProps {
  form: IFormConfig
}
export interface ExtendedFieldArrayProps extends CommonProps {
  fields: ReturnType<typeof useFieldArray>["fields"]
  append: ReturnType<typeof useFieldArray>["append"]
  remove: ReturnType<typeof useFieldArray>["remove"]
}
