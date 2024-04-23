interface IOption {
  value: string;
  label: string;
}
export interface IUpdateProps {
  id: number;
  resource: string;
  field: string;
  isMultipartFormData?: boolean
  setSelected?: React.Dispatch<React.SetStateAction<number | string>>
  
}
export interface IUpdateDropdownSelectProps extends IUpdateProps {
  readonly defaultValue?: string;
  readonly optionsConfig?: IOption[];
  readonly label?: string;
  readonly placeholder?: string;
  readonly className?: string;
  onChange?: (val: number | string) => void;
}
