import { type IFormConfig } from "@src/common/interface";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import { useBranchSelect } from "@src/app/(protected)/(career)/sector/useSelect";

export const AppliedFor: React.FC<{
  form: IFormConfig
}> = ({ form }) => {
  const branch = useBranchSelect("OFFICE");
  return (
    <div className="py-6 border-t border-gray-200 first:pt-0 last:pb-0 first:border-transparent dark:border-gray-700 dark:first:border-transparent">
      <label className="inline-block my-2 text-lg font-medium dark:text-white">
        ຕໍາແຫນ່ງທີ່ສະຫມັກ
      </label>
      <div className="mt-2 space-y-3">
        <Form.Field {...form} name="appliedPosition" label="ຕໍາແຫນ່ງທີ່ສະຫມັກ" >
          <Input placeholder="ຕໍາແຫນ່ງທີ່ສະຫມັກ" />
        </Form.Field>
        <div className=" flex gap-x-5">
          <div className="w-80">
            <Form.Field {...form} name="expectedSalary" label="ຕໍາແຫນ່ງທີ່ສະຫມັກ (ກີບ)" >
              <Input placeholder="3,000,000" numericOnly type="currency" maxLength={100} />
            </Form.Field>
          </div>
          <BranchSection form={form} branch={branch} />
        </div>
      </div>
    </div>
  );
};

const BranchSection = ({ form, branch }: { form: IFormConfig, branch: any }) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...form} name="branchId" label="ສະໝັກຢູ່ສາຂາ">
      <Form.Combobox {...branch} className=" w-80"/>
    </Form.Field>
  </div>
);
