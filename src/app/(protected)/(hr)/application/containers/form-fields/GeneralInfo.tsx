import { type IFormConfig } from "@src/common/interface";
import {
  DrivingLicenceOptions,
  VaccinesOptions,
} from "./SectionInput";
import { Form } from "@/shadcn/components/form";
export const GeneralInfo: React.FC<{
  formConfig: IFormConfig
}> = ({ formConfig }) => {
  return (
    <>
      <div className="py-6 border-t border-gray-200 first:pt-0 last:pb-0 first:border-transparent dark:border-gray-700 dark:first:border-transparent">
        <label className="inline-block my-2 text-lg font-medium dark:text-white">
          ຂໍ້ມູນທົ່ວໄປ{" "}
        </label>
        <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:w-1/2 sm:flex-row">
          <div className="space-y-2 mr-0 sm:mr-7 ">
            <Form.Field {...formConfig.form} name="typeDrivingLicense" label={"ໃບຂັບຂີ່"} require={false}>
              <Form.Select options={DrivingLicenceOptions} defaultValue="Poor" />
            </Form.Field>
          </div>
          <div className="space-y-2 mr-0 sm:mr-7">
            <Form.Field {...formConfig.form} name="typeVaccine" label={"ທ່ານໄດ້ຮັບຢາວັກຊີນ"} require={false}>
              <Form.Select options={VaccinesOptions} defaultValue="Poor" />
            </Form.Field>
          </div>
        </div>
      </div>
    </>
  );
};
