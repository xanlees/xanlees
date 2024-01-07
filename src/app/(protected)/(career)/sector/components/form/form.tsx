import { Form } from "@src/shadcn/components/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@src/shadcn/elements/accordion";
import { useSelect, type RedirectAction } from "@refinedev/core";
import { Card, Input } from "@src/shadcn/elements";
import { useFormConfig } from "./config";
import { type IFormConfig, type IBranch } from "../../interface";
import { FormBranch } from "@src/app/(protected)/(career)/branch/components/form/form";

interface ISectorFormProps {
  redirect: RedirectAction
}

export const FormSector: React.FC<ISectorFormProps> = ({ redirect }) => {
  const formConfig = useFormConfig(redirect);
  const branch = useSelect<IBranch>({
    resource: "branch",
    optionLabel: "name",
    optionValue: "id",
  });
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="italic text-blue-500 underline">
          *ຊອກຂະແໜງທີ່ຕົນຮຽນບໍ່ເຫັນ, ກົດທີ່ນີ້
        </AccordionTrigger>
        <AccordionContent>
          <Form {...formConfig.form}>
            <div className="w-full">
              <Form.Field {...formConfig.form} name="name" label="Sector Name">
                <Input placeholder="Sector Name" className="block w-full" />
              </Form.Field>
            </div>
            <BranchSection formConfig={formConfig} branch={branch} />
          </Form>
          <Card className="p-2 mt-2 rounded-lg">
            <FormBranch redirect="edit" />
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
    <Form.Field {...formConfig.form} name="branchId" label="Branch">
      <Form.Combobox {...branch} />
    </Form.Field>
  </div>
);
