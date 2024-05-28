import { Form } from "@src/shadcn/components/form";
import { Input } from "@src/shadcn/elements";
import { useFormBranchConfig } from "./config";

export const FormBranch: React.FC = () => {
  const formConfig = useFormBranchConfig();
  return (
    <div className="rounded-full w-96 sm:w-[710px] mx-20 ">
      <Form {...formConfig.form}>
        <div className="w-full">
          <Form.Field {...formConfig.form} name="name" label="ສາຂາ">
            <Input placeholder="ສາຂາ" className="block w-full" />
          </Form.Field>
        </div>
      </Form>
    </div>
  );
};
