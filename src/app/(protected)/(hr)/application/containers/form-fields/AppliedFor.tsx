import { useProvinceSelect } from "@src/app/(protected)/(career)/branch/hook/useBranchForm";
import { type IFormConfig } from "@src/common/interface";
import { Form } from "@src/shadcn/components/form";
import { Input } from "@src/shadcn/elements";

export const AppliedFor: React.FC<{
  form: IFormConfig
}> = ({ form }) => {
  const province = useProvinceSelect();
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
          <ProvinceSection form={form} province={province} />
        </div>
      </div>
    </div>
  );
};

const ProvinceSection = ({ form, province }: { form: IFormConfig, province: any }) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...form} name="province" label="ສະໝັກຢູ່ແຂວງ">
      <Form.Combobox {...province} className=" w-80"/>
    </Form.Field>
  </div>
);
