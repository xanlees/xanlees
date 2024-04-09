interface IOption {
  value: string;
  label: string;
}
export interface IUpdateProps {
  id: number;
  resource: string;
  field: string;
  isMultipartFormData?: boolean
}
export interface IUpdateDropdownSelectProps extends IUpdateProps {
  readonly defaultValue?: string;
  readonly optionsConfig?: IOption[];
  readonly label?: string;
  readonly placeholder?: string;
  readonly className?: string;
}
