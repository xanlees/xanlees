import { Form } from "@/shadcn/components/form";
import type { IFormConfig } from "../../interface";
interface IOptions {
  label: string
  value: string
}
export const SectionInput = ({
  formConfig,
  name,
  label,
  options,
}: {
  formConfig: IFormConfig
  name: string
  label: string
  options: IOptions[]
}) => (
  <Form.Field {...formConfig.form} name={name} label={label}>
    <Form.Select options={options} defaultValue="Poor" />
  </Form.Field>
);

export const SkillOptions = [
  {
    label: "ດີ",
    value: "Good",
  },
  {
    label: "ປານກາງ",
    value: "Fair",
  },
  {
    label: "ໜ້ອຍ",
    value: "Poor",
  },
];

export const DrivingLicenceOptions = [
  {
    label: "ປະເພດ A",
    value: "A",
  },
  {
    label: "ປະເພດ B",
    value: "B",
  },
  {
    label: "ປະເພດ C",
    value: "C",
  },
  {
    label: "ປະເພດ D",
    value: "D",
  },
  {
    label: "ປະເພດ E",
    value: "E",
  },
];
