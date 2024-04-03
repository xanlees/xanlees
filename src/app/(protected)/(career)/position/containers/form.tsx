import React from "react";
import {
  useSelect,
  type RedirectAction,
  type BaseOption,
} from "@refinedev/core";
import { Form } from "@src/shadcn/components/form";
import { type ISector } from "../interface";
import { type IFormConfig } from "@src/common/interface";
import { useFormPositionConfig } from "../../branch/containers/form/form/config";
import { Input } from "@src/shadcn/elements";

interface PositionFormProps {
  redirect: RedirectAction
}
export const Position: React.FC<PositionFormProps> = ({ redirect }) => {
  const formConfig = useFormPositionConfig(redirect);
  const sector = useSelect<ISector>({
    resource: "sector",
    optionLabel: "name",
    optionValue: "id",
    filters: [{ field: "pageSize", operator: "eq", value: 50 }],
  });
  const options = sector.queryResult.data?.data.map((item) => {
    return {
      label: `${item?.name} - ${item?.branchDetail?.name}`,
      value: item.id,
    };
  });
  sector.options = options as BaseOption[];
  return (
    <div className="rounded-full w-96 sm:w-[710px] mx-20 ">
      <Form {...formConfig.form}>
        <div className="w-full">
          <Form.Field {...formConfig.form} name="name" label="ຕໍາແໜ່ງ">
            <Input placeholder="ຕໍາແໜ່ງ" className="block w-full" />
          </Form.Field>
        </div>
        <SectorSection formConfig={formConfig} sector={sector} />
      </Form>
    </div>
  );
};

const SectorSection = ({ formConfig, sector }: { formConfig: IFormConfig, sector: any }) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...formConfig.form} name="sectorId" label="ເລືອກຂະແໜງ">
      <Form.Combobox {...sector} />
    </Form.Field>
  </div>
);
