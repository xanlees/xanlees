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
          <Form.Field {...form} name="latitude" label={"ເສັ້ນຂະໜານ (Latitude)"}>
            <Form.DecimalInput placeholder="16.566156152079458"/>
          </Form.Field>
        </div>
      </div>
      <div className="w-full lg:w-64 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name="longitude" label={"ເສັ້ນແວງ (Longitude)"}>
            <Form.DecimalInput placeholder="104.75327756781822"/>
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
          <Form.Field {...form} name={"penaltyPerDay"} label={"ຕັດເງິນເປັນເປີເຊັນຕໍ່ມື້"}>
            <Input placeholder="100" className="w-full" numericOnly maxLength={3} />
          </Form.Field>
        </div>
      </div>
      <div className="w-full lg:w-64 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name="leaveQuota" label={"ໂຄຕ້າວັນພັກ (ມື້)"}>
            <Input placeholder="10" className="w-full" numericOnly />
          </Form.Field>
        </div>
      </div>
    </div>
  );
};
