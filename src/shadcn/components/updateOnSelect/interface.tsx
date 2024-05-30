type RedirectAction =
 | string
 | false;

interface IOption {
  value: string;
  label: string;
  className?: string
}
export interface IUpdateProps {
  id: number;
  resource: string;
  field: string;
  isMultipart?: boolean
  readonly redirect?: RedirectAction;
  setSelected?: React.Dispatch<React.SetStateAction<number | string>>
}
export interface IUpdateDropdownSelectProps extends IUpdateProps {
  readonly redirect?: RedirectAction;
  readonly defaultValue?: string;
  readonly optionsItem?: IOption[];
  readonly label?: string;
  readonly placeholder?: string;
  readonly className?: string;
  onChange?: (val: number | string) => void;
}

