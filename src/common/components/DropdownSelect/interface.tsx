export interface IUpdateDropdownSelectProps {
  readonly defaultValue?: string;
  readonly id: number;
  readonly optionsConfig?: { value: string; label: string }[];
  readonly field: string;
  readonly resource: string;
  readonly label?: string;
}
