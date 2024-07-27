import { type IFormConfig } from "@src/common/interface";
import { Form } from "@src/shadcn/components/form";
import { Input } from "@src/shadcn/elements";

export const ProvinceField: React.FC<{ form: IFormConfig, province: any }> = ({ form, province }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="w-full lg:w-64 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name={"province"} label={"ແຂວງ"} >
            <Form.Combobox {...(province)} className="w-full lg:w-64 " />
          </Form.Field>
        </div>
      </div>

    </div>
  );
};
export const MapInput: React.FC<any> = ({ form }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="w-full lg:w-64 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name="longitude" label={"ເສັ້ນແວງ (Longitude)"}>
            <Input placeholder="" className="w-full" numericOnly />
          </Form.Field>
        </div>
      </div>
      <div className="w-full lg:w-64 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name="latitude" label={"ເສັ້ນຂະໜານ (Latitude)"}>
            <Input placeholder="" className="w-full" numericOnly />
          </Form.Field>
        </div>
      </div>
    </div>
  );
};
export const LeaveQuota: React.FC<any> = ({ form }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="w-full lg:w-64 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name={"penaltyPerDay"} label={"ຕັດເງິນເປັນເປີເຊັນ"}>
            <Input placeholder="100" className="w-full" numericOnly maxLength={3} />
          </Form.Field>
          <p className="text-red-500">ຕັດເງິນຄົນມາຊ້າ ແລະ ກັບໄວນ</p>
        </div>
      </div>
      <div className="w-full lg:w-64 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name="leaveQuota" label={"ໂຄຕ້າວັນພັກ"}>
            <Input placeholder="" className="w-full" numericOnly />
          </Form.Field>
        </div>
      </div>
    </div>
  );
};
