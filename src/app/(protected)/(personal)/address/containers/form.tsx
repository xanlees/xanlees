import React from "react";
import { Form } from "@src/shadcn/components/form";
import { Input } from "@src/shadcn/elements";
import { provinceList } from "@src/common/lib/provinceList";
import { useDistrictSelect } from "../hook/useDistrictSelect";
import { usePersonalAddressForm } from "../hook/usePersonalAddressForm";
import { type IFormConfig } from "@src/common/interface";

export function PersonalAddressForm({ isCurrent = true }) {
  const status = isCurrent ? "ທີ່ຢູ່ປະຈຸບັນ" : "ທີ່ຢູ່ເກີດ";
  const village = isCurrent ? "ບ້ານຢູ່ປະຈຸບັນ" : "ບ້ານເກີດ";
  const { form, state } = usePersonalAddressForm({ status });
  const isCompleted = isFormCompleted(state, isCurrent);
  return (
    <div className="rounded-full w-72 sm:w-[710px]">
      {isCompleted
        ? (<p className="italic">ສຳເລັດແລ້ວ !</p>)
        : (<Form {...form}>
          <div className="flex flex-wrap gap-2">
            <Village form={form} title={village} />
            <Province form={form} />
            <District form={form} />
          </div>
        </Form>)}
    </div>
  );
}

function isFormCompleted(state: { personalCurrentAddressId?: number, personalBornAddressId?: number }, isCurrent: boolean): boolean {
  if (isCurrent) {
    return !!state.personalCurrentAddressId;
  }
  return !!state.personalBornAddressId;
}

const Village: React.FC<{ form: IFormConfig, title: string }> = ({ form, title }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"village"} label={title} require={false} >
          <Input className="w-full" placeholder="ໂຊຫໃຫຍ່" />
        </Form.Field>
      </div>
    </div>
  );
};

const Province: React.FC<{ form: IFormConfig }> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"province"} label={"ເລືອກແຂວງ"} require={false} >
          <Form.Combobox {...(provinceList as any)} className="w-full lg:w-80" />
        </Form.Field>
      </div>
    </div>
  );
};
const District: React.FC<{ form: IFormConfig }> = ({ form }) => {
  const province = (form.watch != null) ? form.watch("province") as string : "";
  const district = useDistrictSelect({ province });
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"district"} label={"ເລືອກເມືອງ"} require={false} >
          <Form.Combobox {...(district as any)} className="w-full lg:w-80" />
        </Form.Field>
      </div>
    </div>
  );
};

