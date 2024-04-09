import { type IFormConfig } from "@src/common/interface";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
export const EmergencyInformationSection: React.FC<{
  form: IFormConfig
}> = ({ form }) => {
  return (
    <div className="py-6 border-t border-gray-200 first:pt-0 last:pb-0 first:border-transparent dark:border-gray-700 dark:first:border-transparent">
      <label className="inline-block my-2 text-lg font-medium dark:text-white">
        ກໍລະນີສຸກເສີນຕິດຕໍ່ຫາ
      </label>
      <div className="mt-2 space-y-3">
        <Form.Field {...form} name="emergencyFullname" label="ຊື່ ແລະ ນາມສະກຸນ" >
          <Input placeholder="ຊື່ ແລະ ນາມສະກຸນ" />
        </Form.Field>
        <div className="grid gap-3 sm:flex">
          <div className="w-full lg:w-80 ">
            <div className="relative w-full mb-3">
              <Form.Field {...form} name="emergencyPhoneNumber" label="ເບີໂທ" >
                <Input placeholder="20xxxxxxxx" />
              </Form.Field>
            </div>
          </div>
          <div className="w-full lg:w-80 ">
            <div className="relative w-full mb-3">
              <Form.Field {...form} name="emergencyRelationship" label="ຄວາມສໍາພັນ" >
                <Input placeholder="" />
              </Form.Field>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
