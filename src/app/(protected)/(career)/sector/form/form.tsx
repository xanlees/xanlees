import { Form } from "@src/shadcn/components/form";
import { useSelect } from "@refinedev/core";
import { Input } from "@src/shadcn/elements";
import { useFormConfig } from "./config";
import { type IBranch } from "../interface";
import { type IFormConfig } from "@src/common/interface";

export const FormSector: React.FC = () => {
  const formConfig = useFormConfig();
  const branch = useSelect<IBranch>({
    resource: "branch",
    optionLabel: "name",
    optionValue: "id",
    filters: [{ field: "pageSize", operator: "eq", value: 50 }],
  });
  return (
    <div className="rounded-full w-96 sm:w-[710px] mx-20 ">
      <Form {...formConfig.form}>
        <div className="w-full">
          <Form.Field {...formConfig.form} name="name" label="ຂະແໜງ">
            <Input placeholder="ຂະແໜງ" className="block w-full" />
          </Form.Field>
        </div>
        <BranchSection formConfig={formConfig} branch={branch} />
      </Form>
    </div>

  );
};

const BranchSection = ({
  formConfig,
  branch,
}: {
  formConfig: IFormConfig
  branch: any
}) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...formConfig.form} name="branchId" label="ເລືອກສາຂາ">
      <Form.Combobox {...branch} />
    </Form.Field>
  </div>
);
